module Main
  ( main
  ) where

import Data.Array (filter, head, find)
import Data.Maybe (Maybe(..), fromJust)
import Data.Tuple (Tuple(..))
import Data.UUID.Random (UUIDv4, make)
import Effect (Effect)
import Effect.Class (liftEffect)
import Flame (Html, QuerySelector(..), Subscription)
import Flame.Application.Effectful as FAE
import Flame.Html.Attribute as HA
import Flame.Html.Element as HE
import Htmls (Classes(..))
import Partial.Unsafe (unsafePartial)
import Prelude (class Eq, Unit, bind, identity, map, not, otherwise, pure, ($), (/=), (<>), (==), (>>>), (<<<))

type Todo
  = { description :: String
    , completed :: Boolean
    , id :: UUIDv4
    }

type TodoBeingEdited
  = { id :: UUIDv4
    , description :: String
    , hasUpdate :: Boolean
    }

type Model
  = { todoList :: Array Todo
    , newTodo :: String
    , todoBeingEdited :: Array TodoBeingEdited
    , filterType :: FilterType
    }

data FilterType
  = All
  | Active
  | Completed

derive instance eqFilterType :: Eq FilterType

data Msg
  = SetNewTodo String
  | AddNewTodo
  | ToggleCompleted UUIDv4
  | DeleteTodo UUIDv4
  | CancelEdit UUIDv4
  | ApplyEdit UUIDv4
  | StartEdit UUIDv4
  | SetEditDescription UUIDv4 String
  | SetFilter FilterType

initGen :: Effect (Tuple Model (Maybe Msg))
initGen = do
  uuid01 <- make
  uuid02 <- make
  pure
    $ Tuple
        { todoList:
            [ { id: uuid01, description: "Buy milk", completed: false }
            , { id: uuid02, description: "Do laundry", completed: true }
            ]
        , newTodo: ""
        , todoBeingEdited: []
        , filterType: All
        }
        Nothing

update :: FAE.AffUpdate Model Msg
update { model, message } = case message of
  SetNewTodo newTodo -> pure $ \_ -> model { newTodo = newTodo }
  AddNewTodo
    | model.newTodo == "" -> pure identity
    | otherwise -> do
      newTodoId <- liftEffect make
      pure
        $ \_ ->
            model
              { newTodo = ""
              , todoList = model.todoList <> [ { id: newTodoId, description: model.newTodo, completed: false } ]
              }
  ToggleCompleted id ->
    pure
      $ \_ ->
          model
            { todoList =
              map
                ( \todo ->
                    if todo.id == id then
                      todo { completed = not todo.completed }
                    else
                      todo
                )
                model.todoList
            }
  DeleteTodo id -> pure $ \_ -> model { todoList = filter (\todo -> todo.id /= id) model.todoList }
  CancelEdit id -> pure $ \_ -> model { todoBeingEdited = [] }
  ApplyEdit id ->
    let
      tbe = (unsafePartial fromJust) <<< head <<< filter (\todo -> todo.id == id) $ model.todoBeingEdited

      newTbe = filter (\t -> t.id /= id) model.todoBeingEdited
    in
      pure
        $ \_ ->
            model
              { todoList =
                map
                  ( \todo ->
                      if todo.id == tbe.id then
                        todo { description = tbe.description }
                      else
                        todo
                  )
                  model.todoList
              , todoBeingEdited = newTbe
              }
  StartEdit id ->
    let
      desc =
        filter (\todo -> todo.id == id)
          >>> map (\todo -> todo.description)
          >>> head
          >>> unsafePartial fromJust
          $ model.todoList
    in
      pure $ \_ -> model { todoBeingEdited = [ { id, description: desc, hasUpdate: false } ] <> model.todoBeingEdited }
  SetEditDescription id description ->
    let
      todoBeingEdited = (unsafePartial fromJust) <<< head <<< filter (\todo -> todo.id == id) $ model.todoBeingEdited

      originalTodo = filter (\todo -> todo.id == todoBeingEdited.id) >>> head >>> unsafePartial fromJust $ model.todoList

      changed = description /= originalTodo.description

      newTodoBeingEdited = map (\t -> if t.id == id then t { description = description, hasUpdate = changed } else t) model.todoBeingEdited
    in
      pure $ \_ -> model { todoBeingEdited = newTodoBeingEdited }
  SetFilter ft -> pure $ \_ -> model { filterType = ft }

view :: Model -> Html Msg
view model =
  HE.div [ HA.class' $ Classes [ "max-w-md", "mx-auto", "bg-white", "shadow-lg", "rounded-lg", "overflow-hidden", "mt-16" ] ]
    [ appTitle
    --    , filterTabs model
    , inputField model
    , viewTodoList model
    ]

appTitle :: forall a. Html a
appTitle =
  HE.div
    [ HA.class' $ Classes [ "px-4", "py-2" ] ]
    [ HE.h1 [ HA.class' $ Classes [ "text-gray-800", "font-bold", "text-2xl", "uppercase" ] ]
        [ HE.text "Flame Todo List" ]
    ]

filterTabs :: Model -> Html Msg
filterTabs model =
  let
    filterClass ft = if model.filterType == ft then "is-active" else ""
  in
    HE.div [ HA.class' "tabs", HA.class' "is-toggle", HA.class' "is-fullwidth" ]
      [ HE.ul_
          [ HE.li [ HA.class' (filterClass All) ]
              [ HE.a [ HA.onClick (SetFilter All) ] [ HE.text "All" ] ]
          , HE.li [ HA.class' (filterClass Active) ]
              [ HE.a [ HA.onClick (SetFilter Active) ] [ HE.text "Active" ] ]
          , HE.li [ HA.class' (filterClass Completed) ]
              [ HE.a [ HA.onClick (SetFilter Completed) ] [ HE.text "Completed" ] ]
          ]
      ]

inputField :: Model -> Html Msg
inputField model =
  HE.div [ HA.class' $ Classes [ "w-full", "max-w-sm", "mx-auto", "px-4", "py-2" ] ]
    [ HE.div [ HA.class' $ Classes [ "flex", "items-center", "border-b-2", "border-teal-500", "py-2" ] ]
        [ HE.input
            [ HA.class' $ Classes [ "appearance-none", "bg-transparent", "border-none", "w-full", "text-gray-700", "mr-3", "py-1", "px-2", "leading-tight", "focus:outline-none" ]
            , HA.type' "text"
            , HA.placeholder "Add a new todo"
            , HA.value model.newTodo
            , HA.onInput SetNewTodo
            ]
        , HE.button
            [ HA.class' $ Classes [ "flex-shrink-0", "bg-teal-500", "hover:bg-teal-700", "border-teal-500", "hover:border-teal-700", "text-sm", "border-4", "text-white", "py-1", "px-2", "rounded" ]
            , HA.onClick AddNewTodo
            ]
            [ HE.text "Add" ]
        ]
    ]

viewTodo :: Todo -> Html Msg
viewTodo todo =
  HE.li [ HA.class' "py-4" ]
    [ HE.div [ HA.class' $ Classes [ "flex", "items-center" ] ]
        [ HE.input
            [ HA.class' $ Classes [ "h-4", "w-4", "text-teal-600", "focus:ring-teal-500", "border-gray-300", "rounded" ]
            , HA.type' "checkbox"
            , HA.checked todo.completed
            , HA.onClick (ToggleCompleted todo.id)
            ]
        , HE.button
            [ HA.class' $ Classes [ "h-8", "w-8", "text-teal-600", "focus:ring-teal-500", "rounded" ]
            , HA.onClick (DeleteTodo todo.id)
            ]
            [ HE.text "X" ]
        , HE.label [ HA.class' $ Classes [ "ml-3", "block", "text-gray-900" ] ]
            [ HE.span [ HA.class' $ Classes [ "text-lg", "font-medium" ] ] [ HE.text todo.description ] ]
        ]
    ]

editTodo :: TodoBeingEdited -> Html Msg
editTodo todo =
  HE.div [ HA.class' "box" ]
    [ HE.div [ HA.class' "field", HA.class' "is-grouped" ]
        [ HE.div [ HA.class' "control", HA.class' "is-expanded" ]
            [ HE.input
                [ HA.class' "input"
                , HA.class' "is-medium"
                , HA.value todo.description
                , HA.onInput (SetEditDescription todo.id)
                ]
            ]
        , HE.div [ HA.class' "control", HA.class' "buttons" ]
            [ HE.button [ HA.class' "button", HA.class' "is-primary", HA.onClick (ApplyEdit todo.id), HA.disabled (not todo.hasUpdate) ]
                [ HE.i' [ HA.class' "fa", HA.class' "fa-save" ] ]
            , HE.button [ HA.class' "button", HA.class' "is-warning", HA.onClick (CancelEdit todo.id) ]
                [ HE.i' [ HA.class' "fa", HA.class' "fa-arrow-right" ] ]
            ]
        ]
    ]

viewTodoList :: Model -> Html Msg
viewTodoList model =
  let
    renderTodo todo = case model.todoBeingEdited of
      [] -> viewTodo todo
      tbes -> case find (\tbe -> tbe.id == todo.id) tbes of
        Just tbe -> editTodo tbe
        Nothing -> viewTodo todo

    shouldRenderTodo todo = case model.filterType of
      All -> true
      Active -> not todo.completed
      Completed -> todo.completed

    todos = filter shouldRenderTodo model.todoList
  in
    HE.ul [ HA.class' $ Classes [ "divide-y", "divide-gray-200", "px-4" ] ]
      [ map renderTodo todos ]

subscribe :: Array (Subscription Msg)
subscribe = []

main :: Effect Unit
main = do
  init <- initGen
  FAE.mount_ (QuerySelector "main")
    { init
    , view
    , update
    , subscribe
    }

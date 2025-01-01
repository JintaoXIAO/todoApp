module Main
  ( main
  ) where

import Data.Array (filter, head)
import Data.Maybe (Maybe(..), fromJust)
import Data.Tuple (Tuple(..))
import Data.UUID.Random (UUIDv4, make)
import Effect (Effect)
import Effect.Class (liftEffect)
import Flame (Html, QuerySelector(..), Subscription)
import Flame.Application.Effectful as FAE
import Flame.Html.Attribute as HA
import Flame.Html.Element as HE
import Partial.Unsafe (unsafePartial)
import Prelude (class Eq, Unit, bind, identity, map, not, otherwise, pure, ($), (/=), (<>), (==), (>>>))

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
    , todoBeingEdited :: Maybe TodoBeingEdited
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
  | CancelEdit
  | ApplyEdit
  | StartEdit UUIDv4
  | SetEditDescription String
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
        , todoBeingEdited: Nothing
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
  CancelEdit -> pure $ \_ -> model { todoBeingEdited = Nothing }
  ApplyEdit ->
    let
      todoBeingEdited = (unsafePartial fromJust) model.todoBeingEdited
    in
      pure
        $ \_ ->
            model
              { todoList =
                map
                  ( \todo ->
                      if todo.id == todoBeingEdited.id then
                        todo { description = todoBeingEdited.description }
                      else
                        todo
                  )
                  model.todoList
              , todoBeingEdited = Nothing
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
      pure $ \_ -> model { todoBeingEdited = Just { id, description: desc, hasUpdate: false } }
  SetEditDescription description ->
    let
      todoBeingEdited = (unsafePartial fromJust) model.todoBeingEdited

      originalTodo = filter (\todo -> todo.id == todoBeingEdited.id) >>> head >>> unsafePartial fromJust $ model.todoList

      changed = description /= originalTodo.description
    in
      pure $ \_ -> model { todoBeingEdited = Just (todoBeingEdited { description = description, hasUpdate = changed }) }
  SetFilter ft -> pure $ \_ -> model { filterType = ft }

view :: Model -> Html Msg
view model =
  HE.div [ HA.style1 "padding" "20" ]
    [ appTitle
    , filterTabs model
    , inputField model
    , viewTodoList model
    ]

appTitle :: forall a. Html a
appTitle =
  HE.p
    [ HA.class' "title" ]
    [ HE.text "Flame Todo List" ]

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
  HE.div [ HA.class' "field", HA.class' "has-addons" ]
    [ HE.div [ HA.class' "control", HA.class' "is-expanded" ]
        [ HE.input [ HA.class' "input", HA.class' "is-medium", HA.type' "text", HA.placeholder "Add a new todo", HA.value model.newTodo, HA.onInput SetNewTodo ] ]
    , HE.div [ HA.class' "control" ]
        [ HE.button [ HA.class' "button", HA.class' "is-primary", HA.class' "is-medium", HA.onClick AddNewTodo ]
            [ HE.i' [ HA.class' "fas", HA.class' "fa-plus" ] ]
        ]
    ]

viewTodo :: Todo -> Html Msg
viewTodo todo =
  HE.div [ HA.class' "box" ]
    [ HE.div [ HA.class' "columns", HA.class' "is-mobile", HA.class' "is-vcentered" ]
        [ HE.div [ HA.class' "column" ]
            [ HE.p [ HA.class' "subtitle" ] [ HE.text todo.description ] ]
        , HE.div [ HA.class' "column", HA.class' "is-narrow" ]
            [ HE.div [ HA.class' "buttons" ]
                [ HE.button
                    [ HA.class' "button"
                    , HA.class' if todo.completed then "is-success" else ""
                    , HA.onClick (ToggleCompleted todo.id)
                    ]
                    [ HE.i' [ HA.class' "fa", HA.class' "fa-check" ] ]
                , HE.button
                    [ HA.class' "button"
                    , HA.class' "is-primary"
                    , HA.onClick (StartEdit todo.id)
                    ]
                    [ HE.i' [ HA.class' "fa", HA.class' "fa-edit" ] ]
                , HE.button
                    [ HA.class' "button"
                    , HA.class' "is-danger"
                    , HA.onClick (DeleteTodo todo.id)
                    ]
                    [ HE.i' [ HA.class' "fa", HA.class' "fa-times" ] ]
                ]
            ]
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
                , HA.onInput SetEditDescription
                ]
            ]
        , HE.div [ HA.class' "control", HA.class' "buttons" ]
            [ HE.button [ HA.class' "button", HA.class' "is-primary", HA.onClick ApplyEdit, HA.disabled (not todo.hasUpdate) ]
                [ HE.i' [ HA.class' "fa", HA.class' "fa-save" ] ]
            , HE.button [ HA.class' "button", HA.class' "is-warning", HA.onClick CancelEdit ]
                [ HE.i' [ HA.class' "fa", HA.class' "fa-arrow-right" ] ]
            ]
        ]
    ]

viewTodoList :: Model -> Html Msg
viewTodoList model =
  let
    renderTodo todo = case model.todoBeingEdited of
      Just todoBeingEdited
        | todo.id == todoBeingEdited.id -> editTodo todoBeingEdited
      _ -> viewTodo todo

    shouldRenderTodo todo = case model.filterType of
      All -> true
      Active -> not todo.completed
      Completed -> todo.completed

    todos = filter shouldRenderTodo model.todoList
  in
    HE.ul_ [ map renderTodo todos ]

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

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
import Partial.Unsafe (unsafePartial)
import Prelude (class Eq, Unit, bind, identity, map, not, otherwise, pure, ($), (/=), (<>), (==), (>>>), (<<<))
import Tailwindcss

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
  HE.div [ HA.class' $ cs [ max_w_md, mx_auto, bg_white, shadow_lg, rounded_lg, overflow_hidden, mt_16 ] ]
    [ appTitle
    , inputField model
    , filterTabs model
    , viewTodoList model
    ]

appTitle :: forall a. Html a
appTitle =
  HE.div
    [ HA.class' $ cs [ px_4, py_2 ] ]
    [ HE.h1 [ HA.class' $ cs [ text_gray_800, font_bold, text_2xl, uppercase ] ]
        [ HE.text "Flame Todo List" ]
    ]

filterTabs :: Model -> Html Msg
filterTabs model =
  HE.div [ HA.class' $ cs [ flex, items_center, justify_center, space_x_1, py_2 ] ]
    [ HE.button
        [ HA.class'
            $ cs
                [ bg_teal_500
                , hover_bg_teal_700
                , border_teal_500
                , hover_border_teal_700
                , text_white
                , text_sm
                , border_4
                , py_1
                , px_2
                , rounded
                , focus_outline_none
                , focus_ring_2
                , focus_ring_teal_500
                ]
        , HA.onClick (SetFilter All)
        ]
        [ HE.text "All" ]
    , HE.button
        [ HA.class'
            $ cs
                [ bg_teal_500
                , hover_bg_teal_700
                , border_teal_500
                , hover_border_teal_700
                , text_white
                , text_sm
                , border_4
                , py_1
                , px_2
                , rounded
                , focus_outline_none
                , focus_ring_2
                , focus_ring_teal_500
                ]
        , HA.onClick (SetFilter Active)
        ]
        [ HE.text "Active" ]
    , HE.button
        [ HA.class'
            $ cs
                [ bg_teal_500
                , hover_bg_teal_700
                , border_teal_500
                , hover_border_teal_700
                , text_white
                , text_sm
                , border_4
                , py_1
                , px_2
                , rounded
                , focus_outline_none
                , focus_ring_2
                , focus_ring_teal_500
                ]
        , HA.onClick (SetFilter Completed)
        ]
        [ HE.text "Completed" ]
    ]

inputField :: Model -> Html Msg
inputField model =
  HE.div [ HA.class' $ cs [ w_full, max_w_sm, mx_auto, px_4, py_2 ] ]
    [ HE.div [ HA.class' $ cs [ flex, items_center, border_b_2, border_teal_500, py_2 ] ]
        [ HE.input
            [ HA.class'
                $ cs
                    [ appearance_none
                    , bg_transparent
                    , border_none
                    , w_full
                    , text_gray_700
                    , mr_3
                    , py_1
                    , px_2
                    , leading_tight
                    , focus_outline_none
                    ]
            , HA.type' "text"
            , HA.placeholder "Add a new todo"
            , HA.value model.newTodo
            , HA.onInput SetNewTodo
            ]
        , HE.button
            [ HA.class'
                $ cs
                    [ flex_shrink_0
                    , bg_teal_500
                    , hover_bg_teal_700
                    , border_teal_500
                    , hover_border_teal_700
                    , text_sm
                    , border_4
                    , text_white
                    , py_1
                    , px_2
                    , rounded
                    ]
            , HA.onClick AddNewTodo
            ]
            [ HE.text "Add" ]
        ]
    ]

viewTodo :: Todo -> Html Msg
viewTodo todo =
  HE.li [ HA.class' py_4 ]
    [ HE.div [ HA.class' $ cs [ flex, items_center, gap_1 ] ]
        [ HE.button
            [ HA.class' $ cs [ h_4, w_4, text_gray_600_ todo.completed, text_green_600_ (not todo.completed), border_gray_300, rounded ]
            , HA.onClick (ToggleCompleted todo.id)
            ]
            [ HE.i' [ HA.class' "ai-ribbon" ] ]
        , HE.button
            [ HA.class' $ cs [ h_4, w_4, text_red_600, border_gray_300, rounded ]
            , HA.onClick (DeleteTodo todo.id)
            ]
            [ HE.i' [ HA.class' "ai-trash-can" ] ]
        , HE.button
            [ HA.class' $ cs [ h_4, w_4, text_neutral_600, border_gray_300, rounded ]
            , HA.onClick (StartEdit todo.id)
            ]
            [ HE.i' [ HA.class' "ai-edit" ] ]
        , HE.label [ HA.class' $ cs [ ml_3, block, text_gray_900 ] ]
            [ HE.span [ HA.class' $ cs [ text_lg, font_medium, line_through_ todo.completed ] ]
                [ HE.text todo.description ]
            ]
        ]
    ]

editTodo :: TodoBeingEdited -> Html Msg
editTodo todo =
  HE.li [ HA.class' py_4 ]
    [ HE.div [ HA.class' $ cs [ flex, items_center, gap_1 ] ]
        [ HE.input
            [ HA.class' $ cs [ h_8, w_full, text_teal_600, focus_ring_teal_500, border_gray_300, rounded, pl_3 ]
            , HA.type' "text"
            , HA.value todo.description
            , HA.onInput (SetEditDescription todo.id)
            ]
        , HE.div [ HA.class' $ cs [ ml_3, flex, items_center ] ]
            [ HE.button
                [ HA.class'
                    $ cs
                        [ h_8
                        , px_4
                        , text_sm
                        , text_white
                        , bg_teal_600
                        , rounded
                        , hover_bg_teal_700
                        , focus_outline_none
                        , focus_ring_2
                        , focus_ring_teal_500
                        ]
                , HA.onClick (ApplyEdit todo.id)
                ]
                [ HE.i' [ HA.class' "ai_circle_check" ] ]
            , HE.button
                [ HA.class'
                    $ cs
                        [ h_8
                        , px_4
                        , ml_2
                        , text_sm
                        , text_gray_700
                        , bg_white
                        , border
                        , border_gray_300
                        , rounded
                        , hover_bg_gray_100
                        , focus_outline_none
                        , focus_ring_2
                        , focus_ring_teal_500
                        ]
                , HA.onClick (CancelEdit todo.id)
                ]
                [ HE.i' [ HA.class' "ai_circle_minus" ] ]
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
    HE.ul [ HA.class' $ cs [ divide_y, divide_gray_200, px_4 ] ]
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

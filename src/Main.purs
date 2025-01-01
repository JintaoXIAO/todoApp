module Main where



import Data.Array (filter, length, null, head)
import Data.Maybe (Maybe(..), fromJust)
import Effect (Effect)
import Flame (Html, QuerySelector(..), Subscription)
import Flame.Application.NoEffects as FAN
import Flame.Html.Attribute as HA
import Flame.Html.Element as HE
import Partial.Unsafe (unsafePartial)
import Prelude (Unit, map, not, otherwise, ($), (+), (/=), (<>), (==), (>>>))


type Todo =
  { description :: String
  , completed :: Boolean
  , id :: Int
  }

type TodoBeingEdited =
  { id :: Int
  , description :: String
  }

type Model =
  { todoList :: Array Todo
  , newTodo :: String
  , todoBeingEdited :: Maybe TodoBeingEdited
  }

data Msg
  = SetNewTodo String
  | AddNewTodo
  | ToggleCompleted Int
  | DeleteTodo Int
  | CancelEdit
  | ApplyEdit
  | StartEdit Int
  | SetEditDescription String

init :: Model
init =
  { todoList:
    [ { id: 1, description: "Buy milk", completed: false }
    , { id: 2, description: "Do laundry", completed: true }
    ]
  , newTodo: ""
  , todoBeingEdited: Nothing
  }

update :: Model -> Msg -> Model
update model msg =
  case msg of
    SetNewTodo newTodo -> model { newTodo = newTodo }
    AddNewTodo
      | model.newTodo == "" -> model
      | otherwise ->
          model { newTodo = ""
                , todoList = model.todoList <> [{ id: generateNewTodoId model, description: model.newTodo, completed: false }] }
    ToggleCompleted id -> model { todoList = map (\todo ->
                                                      if todo.id == id
                                                      then todo { completed = not todo.completed }
                                                      else todo) model.todoList }
    DeleteTodo id -> model { todoList = filter (\todo -> todo.id /= id) model.todoList }
    CancelEdit -> model { todoBeingEdited = Nothing }
    ApplyEdit ->
      let todoBeingEdited = (unsafePartial fromJust) model.todoBeingEdited in
      model { todoList = map (\todo ->
                                if todo.id == todoBeingEdited.id
                                then todo { description = todoBeingEdited.description }
                                else todo) model.todoList
            , todoBeingEdited = Nothing
            }
    StartEdit id ->
      let desc = filter (\todo -> todo.id == id)
                  >>> map (\todo -> todo.description)
                  >>> head
                  >>> unsafePartial fromJust
                  $ model.todoList

      in
      model { todoBeingEdited = Just { id, description: desc } }
    SetEditDescription description ->
      let todoBeingEdited = (unsafePartial fromJust) model.todoBeingEdited
      in
      model { todoBeingEdited = Just (todoBeingEdited { description = description }) }

  where
    generateNewTodoId :: Model -> Int
    generateNewTodoId _model =
      if null _model.todoList
      then 1
      else length _model.todoList + 1

view :: Model -> Html Msg
view model =
  HE.div [ HA.style1 "padding" "20"]
    [ appTitle
    , inputField model
    , todoList model
    ]

appTitle :: forall a. Html a
appTitle =
  HE.p
    [ HA.class' "title" ]
    [ HE.text "Flame Todo List" ]

inputField :: Model -> Html Msg
inputField model =
  HE.div [ HA.class' "field", HA.class' "has-addons" ]
    [ HE.div [ HA.class' "control", HA.class' "is-expanded"]
        [ HE.input [ HA.class' "input", HA.class' "is-medium", HA.type' "text", HA.placeholder "Add a new todo", HA.value model.newTodo, HA.onInput SetNewTodo ]  ]
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
            [ HE.div [ HA.class' "buttons"]
                [ HE.button [ HA.class' "button"
                            , HA.class' if todo.completed then "is-success" else ""
                            , HA.onClick (ToggleCompleted todo.id)
                            ] [ HE.i' [ HA.class' "fa", HA.class' "fa-check" ] ]
                , HE.button [ HA.class' "button"
                            , HA.class' "is-primary"
                            , HA.onClick (StartEdit todo.id)
                            ] [ HE.i' [ HA.class' "fa", HA.class' "fa-edit" ] ]
                , HE.button [ HA.class' "button"
                            , HA.class' "is-danger"
                            , HA.onClick (DeleteTodo todo.id)
                            ] [ HE.i' [ HA.class' "fa", HA.class' "fa-times" ] ]
                ]
            ]

        ]
    ]

editTodo :: TodoBeingEdited -> Html Msg
editTodo todo =
  HE.div [ HA.class' "box" ]
    [ HE.div [ HA.class' "field", HA.class' "is-grouped" ]
      [ HE.div [ HA.class' "control", HA.class' "is-expanded" ]
          [ HE.input [ HA.class' "input"
                     , HA.class' "is-medium"
                     , HA.value todo.description
                     , HA.onInput SetEditDescription
                     ]
          ]
      , HE.div [ HA.class' "control", HA.class' "buttons" ]
          [ HE.button [ HA.class' "button", HA.class' "is-primary", HA.onClick ApplyEdit ]
              [ HE.i' [ HA.class' "fa", HA.class' "fa-save" ] ]
          , HE.button [ HA.class' "button", HA.class' "is-warning", HA.onClick CancelEdit ]
              [ HE.i' [ HA.class' "fa", HA.class' "fa-arrow-right" ] ]
          ]
      ]
    ]

todoList :: Model -> Html Msg
todoList model =
  let renderTodo todo = case model.todoBeingEdited of
                          Just todoBeingEdited | todo.id == todoBeingEdited.id -> editTodo todoBeingEdited
                          _ -> viewTodo todo
  in
  HE.ul_ [ map renderTodo model.todoList ]

subscribe :: Array (Subscription Msg)
subscribe = []

main :: Effect Unit
main =
  FAN.mount_ (QuerySelector "main")
    { init
    , view
    , update
    , subscribe
    }

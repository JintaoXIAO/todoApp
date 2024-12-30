module Main where



import Effect (Effect)
import Flame (Html, QuerySelector(..), Subscription)
import Flame.Application.NoEffects as FAN
import Flame.Html.Attribute as HA
import Flame.Html.Element as HE
import Prelude ((+), map, (==), otherwise, Unit, (<>), not, (/=))
import Data.Array (length, filter)

type Todo =
  { description :: String
  , completed :: Boolean
  , id :: Int
  }

type Model =
  { todoList :: Array Todo
  , newTodo :: String
  }

data Msg
  = SetNewTodo String
  | AddNewTodo
  | ToggleCompleted Int
  | DeleteTodo Int

init :: Model
init =
  { todoList:
    [ { id: 1, description: "Buy milk", completed: false }
    , { id: 2, description: "Do laundry", completed: true }
    ]
  , newTodo: ""
  }

update :: Model -> Msg -> Model
update model msg =
  case msg of
    SetNewTodo newTodo -> model { newTodo = newTodo }
    AddNewTodo
      | model.newTodo == "" -> model
      | otherwise -> model { newTodo = "", todoList = model.todoList <> [{ id: generateNewTodoId model, description: model.newTodo, completed: false }] }
    ToggleCompleted id -> model { todoList = map (\todo ->
                                                      if todo.id == id
                                                      then todo { completed = not todo.completed }
                                                      else todo) model.todoList }
    DeleteTodo id -> model { todoList = filter (\todo -> todo.id /= id) model.todoList }
  where
    generateNewTodoId :: Model -> Int
    generateNewTodoId model =
      case model.todoList of
        [] -> 1
        xs -> length xs + 1

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
                            , HA.class' "is-danger"
                            , HA.onClick (DeleteTodo todo.id)
                            ] [ HE.i' [ HA.class' "fa", HA.class' "fa-times" ] ]
                ]
            ]

        ]
    ]

todoList :: Model -> Html Msg
todoList model =
  HE.ul_ [
    [ map viewTodo model.todoList ]
  ]

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

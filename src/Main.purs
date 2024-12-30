module Main where

import Prelude

import Effect (Effect)
import Flame (Html, QuerySelector(..), Subscription)
import Flame.Application.NoEffects as FAN
import Flame.Html.Attribute as HA
import Flame.Html.Element as HE


type Model =
  { todoList :: Array String
  , newTodo :: String
  }

data Msg
  = SetNewTodo String
  | AddNewTodo

init :: Model
init =
  { todoList: []
  , newTodo: ""
  }

update :: Model -> Msg -> Model
update model msg =
  case msg of
    SetNewTodo newTodo -> model { newTodo = newTodo }
    AddNewTodo
      | model.newTodo == "" -> model
      | otherwise -> model { todoList = model.todoList <> [model.newTodo], newTodo = "" }

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

todoList :: Model -> Html Msg
todoList model =
  HE.ul_ [
    [ map (\todo -> HE.li [ HA.class' "box", HA.class' "subtitle" ]
                          [ HE.text todo ]) model.todoList  ]
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

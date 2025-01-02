module Htmls (Classes(..), class_if, class_if_else) where


import Flame.Html.Attribute (class ToClassList)

newtype Classes = Classes (Array String)

instance ToClassList Classes where
  to (Classes classes) = classes

class_if :: String -> Boolean -> String
class_if className condition = class_if_else className condition ""

class_if_else :: String -> Boolean -> String -> String
class_if_else className condition elseClassName = if condition then className else elseClassName
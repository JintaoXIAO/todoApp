module Htmls (Classes(..)) where


import Flame.Html.Attribute (class ToClassList)

newtype Classes = Classes (Array String)

instance ToClassList Classes where
  to (Classes classes) = classes

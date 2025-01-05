module Tailwindcss where

import Prelude
import Data.Array (singleton, foldMap)
import Flame.Html.Attribute (class ToClassList)

data Classes
  = Class String
  | Classes (Array String)

instance semigroupClasses :: Semigroup Classes where
  append (Class clz1) (Class clz2) = Classes $ singleton clz1 <> singleton clz2
  append (Class clz) (Classes clzs) = Classes $ singleton clz <> clzs
  append (Classes clzs) (Class clz) = Classes $ clzs <> singleton clz
  append (Classes clzs1) (Classes clzs2) = Classes $ clzs1 <> clzs2

instance monoidClasses :: Monoid Classes where
  mempty = Class ""

instance classToClassListInstance :: ToClassList Classes where
  to (Class clz) = singleton clz
  to (Classes clzs) = clzs

cs :: Array Classes -> Classes
cs = foldMap identity

cls :: String -> Classes
cls = Classes <<< singleton

h_8 :: Classes
h_8 = cls "h-8"

w_8 :: Classes
w_8 = cls "w-8"

bg_transparent :: Classes
bg_transparent = cls "bg-transparent"

bg_teal_600 :: Classes
bg_teal_600 = cls "bg-teal-600"

border_none :: Classes
border_none = cls "border-none"

leading_tight :: Classes
leading_tight = cls "leading-tight"

hover_bg_gray_700 :: Classes
hover_bg_gray_700 = cls "hover:bg-gray-700"

hover_bg_gray_100 :: Classes
hover_bg_gray_100 = cls "hover:bg-gray-100"

flex_shrink_0 :: Classes
flex_shrink_0 = cls "flex-shrink-0"

ml_2 :: Classes
ml_2 = cls "ml-2"

text_gray_700 :: Classes
text_gray_700 = cls "text-gray-700"

mr_3 :: Classes
mr_3 = cls "mr-3"

border :: Classes
border = cls "border"

divide_gray_200 :: Classes
divide_gray_200 = cls "divide-gray-200"

border_gray_300 :: Classes
border_gray_300 = cls "border-gray-300"

border_b_2 :: Classes
border_b_2 = cls "border-b-2"

py_1 :: Classes
py_1 = cls "py-1"

divide_y :: Classes
divide_y = cls "divide-y"

max_w_md :: Classes
max_w_md = cls "max-w-md"

bg_white :: Classes
bg_white = cls "bg-white"

gap_1 :: Classes
gap_1 = cls "gap-1"

shadow_lg :: Classes
shadow_lg = cls "shadow-lg"

rounded_lg :: Classes
rounded_lg = cls "rounded-lg"

overflow_hidden :: Classes
overflow_hidden = cls "overflow-hidden"

mt_16 :: Classes
mt_16 = cls "mt-16"

w_full :: Classes
w_full = cls "w-full"

max_w_sm :: Classes
max_w_sm = cls "max-w-sm"

mx_auto :: Classes
mx_auto = cls "mx-auto"

px_4 :: Classes
px_4 = cls "px-4"

py_2 :: Classes
py_2 = cls "py-2"

text_gray_800 :: Classes
text_gray_800 = cls "text-gray-800"

text_gray_600 :: Classes
text_gray_600 = cls "text-gray-600"

text_gray_600_ :: Boolean -> Classes
text_gray_600_ cond = if cond then text_gray_600 else mempty

text_green_600 :: Classes
text_green_600 = cls "text-green-600"

text_green_600_ :: Boolean -> Classes
text_green_600_ cond = if cond then text_green_600 else mempty

text_red_600 :: Classes
text_red_600 = cls "text-red-600"

text_neutral_600 :: Classes
text_neutral_600 = cls "text-neutral-600"

h_4 :: Classes
h_4 = cls "h-4"

w_4 :: Classes
w_4 = cls "w-4"

font_bold :: Classes
font_bold = cls "font-bold"

text_2xl :: Classes
text_2xl = cls "text-2xl"

uppercase :: Classes
uppercase = cls "uppercase"

flex :: Classes
flex = cls "flex"

items_center :: Classes
items_center = cls "items-center"

justify_center :: Classes
justify_center = cls "justify-center"

ml_3 :: Classes
ml_3 = cls "ml-3"

block :: Classes
block = cls "block"

text_gray_900 :: Classes
text_gray_900 = cls "text-gray-900"

text_teal_600 :: Classes
text_teal_600 = cls "text-teal-600"

pl_3 :: Classes
pl_3 = cls "pl-3"

appearance_none :: Classes
appearance_none = cls "appearance-none"

text_lg :: Classes
text_lg = cls "text-lg"

font_medium :: Classes
font_medium = cls "font-medium"

line_through :: Classes
line_through = cls "line-through"

line_through_ :: Boolean -> Classes
line_through_ cond = if cond then line_through else mempty

space_x_1 :: Classes
space_x_1 = cls "space-x-1"

bg_teal_500 :: Classes
bg_teal_500 = cls "bg-teal-500"

hover_bg_teal_700 :: Classes
hover_bg_teal_700 = cls "hover:bg-teal-700"

border_teal_500 :: Classes
border_teal_500 = cls "border-teal-500"

focus_ring_teal_500 :: Classes
focus_ring_teal_500 = cls "focus:ring-teal-500"

focus_ring_2 :: Classes
focus_ring_2 = cls "focus:ring-2"

focus_outline_none :: Classes
focus_outline_none = cls "focus:outline-none"

rounded :: Classes
rounded = cls "rounded"

px_2 :: Classes
px_2 = cls "px-2"

py_4 :: Classes
py_4 = cls "py-4"

border_4 :: Classes
border_4 = cls "border-4"

text_sm :: Classes
text_sm = cls "text-sm"

text_white :: Classes
text_white = cls "text-white"

hover_border_teal_700 :: Classes
hover_border_teal_700 = cls "hover:border-teal-700"

# Regression test for bug #399: quoted tag values should not produce
# "Illegal character found in tag" errors
tag @a add "hello there"
kill @e[tag="hello there"]

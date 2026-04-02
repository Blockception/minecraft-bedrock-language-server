# Regression test for bugs #401 (score comparators) and #402 (fake player names)

# Valid score comparators - should not produce comparator errors
execute if score @s test_obj = @p test_obj run kill @s
execute if score @s test_obj <= @p test_obj run kill @s
execute if score @s test_obj >= @p test_obj run kill @s
execute if score @s test_obj < @p test_obj run kill @s
execute if score @s test_obj > @p test_obj run kill @s

# Fake player names in ALL score positions (#402): target, source, unless-target
execute if score #fakeplayer test_obj = @p test_obj run kill @s
execute if score @s test_obj = #fakeplayer test_obj run kill @s
execute unless score #fakeplayer test_obj = @p test_obj run kill @s
execute unless score $myvar test_obj matches 0 run kill @s

# Invalid comparator (scoreboard operation operator) - should produce error (#401)
execute if score @s test_obj %= @p test_obj run kill @s

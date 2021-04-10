const std = @import("std");
const testing = std.testing;

export fn add(a: i32, b: i32) i32 {
    return a + b;
}

test "basic add functionality" {
    testing.expect(add(3, 7) == 10);
}

extern fn print(i32) void;

export fn printAdd(a: i32, b: i32) void {
    print(add(a, b));
}

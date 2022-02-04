const std = @import("std");
const testing = std.testing;
const zvelte = @import("./runtime/main.zig");

// re-export Zig DOM example
usingnamespace @import("./zigdom.zig");

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

export fn createApp() bool {
    const Props = struct {
        title: []u8,
    };
    const Events = struct {};
    const Slots = struct {};
    const App = zvelte.Component(Props, Events, Slots);
    // const app = App.init(.{});
    _ = App.init(.{});
    return true;
}

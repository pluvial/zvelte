const std = @import("std");
const fs = std.fs;

pub fn makeFn(self: *std.build.Step) !void {
    var dir = try fs.cwd().openDir("example", .{});
    defer dir.close();
    std.debug.print("Testing {}", .{dir});
}

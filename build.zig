const std = @import("std");

pub fn build(b: *std.build.Builder) void {
    const mode = b.standardReleaseOptions();
    const target = .{ .cpu_arch = .wasm32, .os_tag = .freestanding };

    const lib = b.addStaticLibrary("main", "src/main.zig");
    lib.setBuildMode(mode);
    lib.setTarget(target);
    lib.setOutputDir("public/build");
    lib.install();

    const main_tests = b.addTest("src/main.zig");
    main_tests.setBuildMode(mode);

    const test_step = b.step("test", "Run library tests");
    test_step.dependOn(&main_tests.step);

    const serve_command = b.addSystemCommand(&[_][]const u8{ "sirv", "public", "--dev" });
    const serve_step = b.step("serve", "Serve the public folder");
    serve_step.dependOn(b.getInstallStep());
    serve_step.dependOn(&serve_command.step);
}

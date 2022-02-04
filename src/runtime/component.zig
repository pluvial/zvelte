// based on
// options: {
//   target: Element;
//   anchor?: Element;
//   props?: Props;
//   hydrate?: boolean;
//   intro?: boolean;
//   $$inline?: boolean;
// }
pub const Options = struct {};

// based on
// interface T$$ {
// 	 dirty: number[];
// 	 ctx: null|any;
// 	 bound: any;
// 	 update: () => void;
// 	 callbacks: any;
// 	 after_update: any[];
// 	 props: Record<string, 0 | string>;
// 	 fragment: null|false|Fragment;
// 	 not_equal: any;
// 	 before_update: any[];
// 	 context: Map<any, any>;
// 	 on_mount: any[];
// 	 on_destroy: any[];
// 	 skip_bound: boolean;
// 	 on_disconnect: any[];
// }
const Internal = struct {};

// based on
// export declare class SvelteComponent {
//   $$: T$$;
//   $$set?: ($$props: any) => void;
//   $destroy(): void;
//   $on(type: any, callback: any): () => void;
//   $set($$props: any): void;
// }
// export interface SvelteComponentTyped<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any> {
//     $set(props?: Partial<Props>): void;
//     $on<K extends Extract<keyof Events, string>>(type: K, callback: (e: Events[K]) => void): () => void;
//     $destroy(): void;
//     [accessor: string]: any;
// }
pub fn Component(comptime Props: type, comptime _: type, comptime _: type) type {
    const Event = {};
    return struct {
        const Self = @This();

        internal: Internal,

        // probably need an allocator here
        // pub fn init(options: Options) Self {
        pub fn init(_: Options) Self {
            return Self{ .internal = .{} };
        }
        // take *Self instead to set self.* = undefined?
        // pub fn deinit(self: Self) void {}
        pub fn deinit(_: Self) void {}

        // fn set(self: Self, props: ?Props) void {}
        fn set(_: Self, _: ?Props) void {}

        // fn on(self: Self, event_type: []u8, callback: fn (event: Event) void) fn () void {
        fn on(_: Self, _: []u8, _: fn (event: Event) void) fn () void {
            return fn () void{};
        }
    };
}

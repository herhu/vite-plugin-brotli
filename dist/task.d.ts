export declare function createConcurrentQueue(limit: number): {
    enqueue(task: () => Promise<void>): void;
    wait(): Promise<void>;
};
//# sourceMappingURL=task.d.ts.map
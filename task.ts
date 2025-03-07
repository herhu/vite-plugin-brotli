export function createConcurrentQueue(limit: number) {
    const tasks: (() => Promise<void>)[] = [];
    let running = 0;
  
    function runNext() {
      if (running >= limit || tasks.length === 0) return;
      running++;
      const task = tasks.shift()!;
      task().finally(() => {
        running--;
        runNext();
      });
    }
  
    return {
      enqueue(task: () => Promise<void>) {
        tasks.push(task);
        runNext();
      },
      async wait() {
        await Promise.all(tasks.map((task) => task()));
      }
    };
  }
  
export const mixin = {
  methods: {
    myFun(funName) {
      switch (funName) {
        case 'a':
          () => {
            //   具体执行的操作
          }
          break;
        case 'b':
          () => {
            //   具体执行的操作
          }
          break;
      }
    }
  }
}

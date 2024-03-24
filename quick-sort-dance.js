function quickSort_dance_version(array, left, right, compare_func) {
    let print = (head) => {
        let decorate = (i) => {
            let value = array[i];
            let msg = value;
            if (i == focus)
                msg = "(" + msg + ")";
            if (i == cursor)
                msg = "#" + msg;
            if (i == left)
                msg = "[" + msg;
            if (i == right)
                msg = msg + "]";
            return msg;
        };

        let str = head;
        for (let i = 0; i < array.length; ++i)
            str += decorate(i) + ",";
        console.log(str);
    }

    let swap = (array, x, y) => {
        [array[x], array[y]] = [array[y], array[x]];
    };

    let swap_condition = (array, focus, cursor) => {
        let cursor_value = array[cursor];
        let focus_value = array[focus];
        if (focus < cursor) // 主角在左邊
            return compare_func(focus_value, cursor_value);

        if (cursor < focus) // 主角在右邊
            return compare_func(cursor_value, focus_value);

        return false;
    };

    let focus = left; // 主角
    let cursor_offset = -1; // 一開始往左移動
    let cursor = right;

    if (focus >= cursor)
        return;

    while (true) {
        print("排序過程 array : ");

        if (swap_condition(array, focus, cursor)) {
            swap(array, focus, cursor); // 交換值
            [focus, cursor] = [cursor, focus]; // 交換索引
            cursor_offset *= -1; // 換方向
            print("進行交換 array : ");
        }
        cursor += cursor_offset;

        if (focus == cursor) { // 結束交叉
            print("結束交叉 array : ");
            quickSort_dance_version(array, left, focus - 1, compare_func);
            quickSort_dance_version(array, focus + 1, right, compare_func);
            return;
        }
    }
}

let source = [3, 0, 1, 8, 7, 2, 5, 4, 9, 6];
console.log(source);
quickSort_dance_version(source, 0, 9, (x, y) => x > y);
console.log(source);

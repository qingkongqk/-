// 障碍物
function Block(img) {
    // 存储图片
    this.img = 'url(' + img + ')';
    // 障碍物坐标
    this.arr = [
        { row: 6, col: 3 },
        { row: 6, col: 4 },
        { row: 6, col: 5 },
        { row: 6, col: 6 },
        { row: 6, col: 7 },
        { row: 6, col: 8 },
    ]
}
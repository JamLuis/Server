'use strict';
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');


// coordinates 需要解析的列 list, 
// direction 解析的方向 ‘vertical’ || ‘horizontal’
// relationMap 解析的列名需要映射的参数名称 例;{'A': 'name'}   {'row': 'paramsName'}
module.exports.EXCEL_TO_JSON = function (filename, coordinates, direction, relationMap) {
    let fileData = [];
    const dirpath = path.join(__dirname, '../statistic/excel');
    const dirpathOutput = path.join(__dirname, '../statistic/output')

    try {
        if (filename.indexOf('.xlsx') > 0) {
            const filepath = path.join(dirpath, filename);
            const workbook = XLSX.readFile(filepath, { cellDates: true });
            const sheetKeys = Object.keys(workbook.Sheets);
            const worksheet = workbook.Sheets[sheetKeys[0]];
            if (worksheet != undefined) {
                // console.log(worksheet);
                const columnNames = Object.keys(worksheet).map(name => {
                    const exg = /[A-Z]{1}\d+$/;
                    const exgNum = /\d+$/;
                    if (exg.test(name)) {
                        return Number(name.match(exgNum)[0]);
                    } else
                        return 0;
                });
                const MaxColumnNum = Math.max(...columnNames);
                console.log(MaxColumnNum)
                if (direction == 'vertical') {
                    const { columnList, startRow } = getStartColumnsAndRow(coordinates);
                    for (let row = startRow + 1; row <= MaxColumnNum; row++) {
                        let dataRow = {};
                        for (let c = 0; c < columnList.length; c++) {
                            const target = columnList[c] + row; // 表格中的坐标值 例：A12 || C12 || D1
                            const paramName = relationMap[columnList[c]]
                            dataRow[paramName] = ((worksheet[target] || {}).v || '').toString().replace(/\s*/g, "");
                        }
                        fileData.push(dataRow);
                    }
                } else {
                    // todo
                }

                const data = JSON.stringify(fileData);
                const fileOutPutPath = path.join(dirpathOutput, `/${filename}.json`);

                fs.writeFile(fileOutPutPath, data, (err) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                })
            }
        } else {
            console.log('文件格式必须为xlsx,并输入完整文件名称');
        }

    } catch (err) {
        console.log(err)
    }
    return () => { };

}


function getStartColumnsAndRow(coordinates) {
    let startRow = null, columnName = [];
    coordinates.map(item => {
        const exg = /[A-Z]{1}\d+$/;
        const exgNum = /\d+$/;
        const exgWord = `^[A-Z]{1}`;

        if (exg.test(item)) {
            if (!startRow)
                startRow = Number(item.match(exgNum)[0]);
            columnName.push(item.match(exgWord)[0]);
        }


    })

    return { columnList: columnName, startRow };
}
import React from 'react';
import XLSX from 'xlsx';
import './App.css';

class App extends React.Component {
    //读取数据
    readExcelData = (e) => {
        //数据存成字符串
        // let files = e.target.files;
        // let name = files.name;
        // let reader = new FileReader();

        // reader.onload = function (evt) {
        //     let bstr = evt.target.result;
        //     let wb = XLSX.read(bstr, { type: 'binary' });
        //     let wsname = wb.SheetNames[0];
        //     let ws = wb.Sheets[wsname];
        //     let data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
        //     console.log(data);
        // };
        // reader.readAsBinaryString(files[0]);

        //数据存成数组
        let files = e.target.files;
        let fileReader = new FileReader();
        let workbook = '';
        let persons = '';

        fileReader.onload = function (ev) {
            try {
                let data = ev.target.result;
                workbook = XLSX.read(data, { type: 'binary' });
                persons = []; // 存储获取到的数据
            } catch (e) {
                console.log('文件类型不正确');
                return;
            }

            // 表格的表格范围，可用于判断表头是否数量是否正确
            let fromTo = '';
            // 遍历每张表读取
            for (let sheet in workbook.Sheets) {
                if (workbook.Sheets.hasOwnProperty(sheet)) {
                    fromTo = workbook.Sheets[sheet]['!ref'];
                    persons = persons.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                    break; // 如果只取第一张表，就取消注释这行
                }
            }

            console.log(persons);
            persons.map((value, key) => {
                console.log(value['字段二'], key);
            });
        };

        // 以二进制方式打开文件
        fileReader.readAsBinaryString(files[0]);
    };
    render() {
        return (
            <div className="App">
                <input type="file" id="excel-file" onChange={this.readExcelData} />
            </div>
        );
    }
}

export default App;

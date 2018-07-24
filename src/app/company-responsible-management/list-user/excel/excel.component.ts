import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver/FileSaver';

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css']
})
export class ExcelComponent implements OnInit {

  data: Array<any>;


  constructor() { }

  ngOnInit() {
    document.title = 'Cynapsys | Excel';


    this.data = JSON.parse(localStorage.getItem('excel'));

    const type = localStorage.getItem('excelType');

    let filename = ''

    if (type === 'user') {
      filename = 'assures.xlsx';
    } else if (type === 'soin') {
      filename = 'bulletins.xlsx';

      for (const d of this.data) {
        delete d.articleMedicals;
      }

    }


    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });


      /* save to file */
    saveAs(new Blob([this.s2ab(wbout)], { type: 'application/octet-stream' }), filename);


    localStorage.setItem('excel', null);
    localStorage.setItem('excelType', null);
  }







  s2ab(s: any) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
  }






}

import * as ExcelJS from 'exceljs';

export class BasedExcel {
  public workbook: ExcelJS.Workbook;
  public worksheet: ExcelJS.Worksheet;

  constructor(sheetName: string = 'Sheet1') {
    this.workbook = new ExcelJS.Workbook();
    this.worksheet = this.workbook.addWorksheet(sheetName);
  }

  public addHeader(rows: string[]) {
    rows.forEach((header, index) => {
      const row = this.worksheet.addRow([header]);
      row.font = { bold: true, size: 16 };
      row.alignment = { vertical: 'middle', horizontal: 'center' };
      row.eachCell(cell => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFFCC00' },
        };
      });
      this.worksheet.mergeCells(`A${index + 1}:E${index + 1}`);
    });

    this.worksheet.addRow([]);
    this.worksheet.addRow([]);
  }

  public async saveAsBuffer(): Promise<Buffer> {
    const buffer = await this.workbook.xlsx.writeBuffer();
    return buffer as Buffer;
  }
}

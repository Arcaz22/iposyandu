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
          fgColor: { argb: 'DDDDDD' },
        };
      });
      this.worksheet.mergeCells(`A${index + 1}:O${index + 1}`);
    });

    this.worksheet.addRow([]);
    this.worksheet.addRow([]);
  }

  public addDetails(details: { title: string, value: string }[]) {
    details.forEach(detail => {
      const row = this.worksheet.addRow([detail.title, ':', detail.value]);
      row.getCell(1).alignment = { horizontal: 'left' };
      row.getCell(2).alignment = { horizontal: 'left' };
      row.getCell(3).alignment = { horizontal: 'left' };

      row.eachCell((cell, colNumber) => {
        cell.border = {
          top: { style: 'thin', color: { argb: 'FF000000' } },
          bottom: { style: 'thin', color: { argb: 'FF000000' } },
          left: colNumber === 1 ? { style: 'thin', color: { argb: 'FF000000' } } : undefined,
          right: colNumber === 3 ? { style: 'thin', color: { argb: 'FF000000' } } : undefined,
        };
      });

      this.worksheet.mergeCells(`C${row.number}:O${row.number}`);
    });

    this.worksheet.getColumn(1).width = 40;
    this.worksheet.getColumn(2).width = 5;
    this.worksheet.getColumn(3).width = 50;
  }

  public addSpacing() {
    this.worksheet.addRow([]);
    this.worksheet.addRow([]);
    const row = this.worksheet.addRow(['A. Data Bayi']);
    row.font = { bold: true, size: 14 };
    row.alignment = { vertical: 'middle', horizontal: 'left' };
    this.worksheet.mergeCells(`A${row.number}:B${row.number}`);
  }

  public addOfficerDetails() {
    this.worksheet.addRow([]);
    this.worksheet.addRow([]);
    const titleRow = this.worksheet.addRow(['B. Petugas yang dikunjungi']);
    titleRow.font = { bold: true, size: 14 };
    this.worksheet.mergeCells(`A${titleRow.number}:B${titleRow.number}`);
    
    const officerDetails = [
      { title: 'Nama', value: '' },
      { title: 'NIP', value: '' },
      { title: 'Jabatan', value: '' },
      { title: 'Tandatangan', value: '' }
    ];
    
    officerDetails.forEach(detail => {
      const row = this.worksheet.addRow([detail.title, ':', detail.value]);
      row.getCell(1).alignment = { horizontal: 'left' };
      row.getCell(2).alignment = { horizontal: 'left' };
      row.getCell(3).alignment = { horizontal: 'left' };
      
      row.eachCell((cell, colNumber) => {
        cell.border = {
          top: { style: 'thin', color: { argb: 'FF000000' } },
          bottom: { style: 'thin', color: { argb: 'FF000000' } },
          left: colNumber === 1 ? { style: 'thin', color: { argb: 'FF000000' } } : undefined,
          right: colNumber === 3 ? { style: 'thin', color: { argb: 'FF000000' } } : undefined,
        };
      });

      this.worksheet.mergeCells(`C${row.number}:E${row.number}`);
    });
  }

  public addData(bayi: any) {
    const headers = [
      'NIK', 'Nama', 'Tempat Lahir', 'Tanggal Lahir', 'Anak Ke', 'Jenis Kelamin',
      'Alamat', 'Golongan Darah', 'Jumlah Anak', 'No Akte Kelahiran', 'Nama Ibu',
      'Nama Ayah', 'Berat Badan', 'Tinggi Badan', 'Jenis Imunisasi'
    ];

    const headerRow = this.worksheet.addRow(headers);
    headerRow.font = { bold: true };
    headerRow.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin', color: { argb: 'FF000000' } },
        bottom: { style: 'thin', color: { argb: 'FF000000' } },
        left: { style: 'thin', color: { argb: 'FF000000' } },
        right: { style: 'thin', color: { argb: 'FF000000' } },
      };
    });

    bayi.forEach((b: any) => {
      const bayiData = [
        b.nik, b.nama, b.tempat_lahir, b.tanggal_lahir, b.anak_ke, b.jenis_kelamin,
        b.alamat, b.golongan_darah, b.jumlah_anak, b.no_akte_kelahiran, b.ibu_nama,
        b.ayah_nama, 
        b.bayiPengukuran.map((pengukuran: any) => `${pengukuran.berat_badan}`).join(', '),
        b.bayiPengukuran.map((pengukuran: any) => `${pengukuran.tinggi_badan}`).join(', '),
        b.bayiImunisasi.map((imunisasi: any) => `${imunisasi.jenis_batch}`).join(', ')
      ];

      const row = this.worksheet.addRow(bayiData);
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin', color: { argb: 'FF000000' } },
          bottom: { style: 'thin', color: { argb: 'FF000000' } },
          left: { style: 'thin', color: { argb: 'FF000000' } },
          right: { style: 'thin', color: { argb: 'FF000000' } },
        };
      });
    });

    const columnWidths = [15, 20, 15, 15, 10, 15, 25, 15, 10, 15, 20, 20, 15, 15, 20];
    this.worksheet.columns.forEach((column, index) => {
      column.width = columnWidths[index] || 10;
    });
  }

  public async saveAsBuffer(): Promise<Buffer> {
    const buffer = await this.workbook.xlsx.writeBuffer();
    return buffer as Buffer;
  }
}
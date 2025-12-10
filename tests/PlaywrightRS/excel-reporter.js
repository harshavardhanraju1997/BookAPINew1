// excel-reporter.js
const ExcelJS = require('exceljs');

class ExcelReporter {
  constructor() {
    this.workbook = new ExcelJS.Workbook();
    this.worksheet = this.workbook.addWorksheet('Test Results');

    this.worksheet.columns = [
      { header: 'Test Case Name', key: 'testName', width: 50 },
      { header: 'Execution Start', key: 'startTime', width: 25 },
      { header: 'Duration (ms)', key: 'duration', width: 15 },
      { header: 'Status', key: 'status', width: 10 },
      { header: 'Comments (Failure Reason)', key: 'comments', width: 60 },
    ];
  }

  // Called when a test ends
  async onTestEnd(test, result) {
    const testName = test.title; // or build from test.titlePath() for full hierarchy

    // result.startTime is a Date, result.duration is in ms
    const startTime = result.startTime
      ? new Date(result.startTime).toISOString()
      : '';

    const duration = result.duration ?? '';

    const status = result.status; // 'passed' | 'failed' | 'skipped' | 'timedOut' | 'interrupted'

    let comments = '';
    if (status === 'failed') {
      const errors = result.errors && result.errors.length
        ? result.errors
        : result.error
        ? [result.error]
        : [];

      comments = errors
        .map(e => e.message || '')
        .join('\n')
        .trim();
    }

    this.worksheet.addRow({
      testName,
      startTime,
      duration,
      status,
      comments,
    });
  }

  // Called once AFTER the whole test run finishes
  async onEnd(result) {
    // You can change the path/name as you like
    const fileName = 'playwright-test-results.xlsx';
    await this.workbook.xlsx.writeFile(fileName);
    console.log(`📁 Excel report generated: ${fileName}`);
  }
}

module.exports = ExcelReporter;

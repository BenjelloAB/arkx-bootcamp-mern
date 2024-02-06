const xlsx = require("xlsx");
const filePath = "./employee_data_.xlsx";
const readExcelFile = () => {
  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    return xlsx.utils.sheet_to_json(worksheet);
  } catch (error) {
    console.log(err.message);
  }
};

const calculateBonuses = () => {
  return (bonuses = readExcelFile().map((employee) => {
    let BonusPercentage;
    let BonusAmount;
    if (employee.AnnualSalary < 50000) {
      BonusPercentage = employee.AnnualSalary * 0.05;
    } else if (50000 < employee.AnnualSalary < 100000) {
      BonusPercentage = employee.AnnualSalary * 0.07;
    } else {
      BonusPercentage = employee.AnnualSalary * 0.1;
    }
    BonusAmount = BonusPercentage + employee.AnnualSalary;
    return {
      ...employee,
      BonusPercentage: Math.floor(BonusPercentage),
      BonusAmount: BonusAmount,
    };
  }));
};

function writetoaFile(data, fileName) {
  // Convert data to worksheet
  const ws = xlsx.utils.json_to_sheet(data);

  // Create a new workbook
  const wb = xlsx.utils.book_new();

  // Add the worksheet to the workbook
  xlsx.utils.book_append_sheet(wb, ws, "Sheet1");

  // Write workbook to file
  const filePath = `${fileName}.xlsx`;
  xlsx.writeFile(wb, filePath, { bookType: "xlsx", type: "file" }, (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log("File written successfully:", filePath);
    }
  });
}
// console.log(calculateBonuses());
let data  = calculateBonuses()
writetoaFile(data, "output2");

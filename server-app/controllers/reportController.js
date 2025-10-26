const { Op } = require("sequelize");
const { format } = require("date-fns-tz");
const timeZone = "Asia/Jakarta";

exports.getDailyReport = async (req, res) => {
  try {
    const { Presensi } = require("../models");

    // optional query param: ?date=YYYY-MM-DD
    const dateQuery = req.query.date;
    let start, end;

    if (dateQuery) {
      const d = new Date(dateQuery);
      if (isNaN(d.getTime())) {
        return res.status(400).json({ message: "Invalid date format. Gunakan YYYY-MM-DD" });
      }
      start = new Date(`${dateQuery}T00:00:00`);
      end = new Date(`${dateQuery}T23:59:59.999`);
    } else {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      start = new Date(`${yyyy}-${mm}-${dd}T00:00:00`);
      end = new Date(`${yyyy}-${mm}-${dd}T23:59:59.999`);
    }

    console.log(`Controller: Mengambil laporan dari ${start.toISOString()} sampai ${end.toISOString()}`);

    const records = await Presensi.findAll({
      where: {
        checkIn: { [Op.between]: [start, end] },
      },
      order: [["checkIn", "ASC"]],
    });

    const data = records.map((r) => ({
      id: r.id,
      userId: r.userId,
      nama: r.nama,
      checkIn: r.checkIn ? format(r.checkIn, "yyyy-MM-dd HH:mm:ssXXX", { timeZone }) : null,
      checkOut: r.checkOut ? format(r.checkOut, "yyyy-MM-dd HH:mm:ssXXX", { timeZone }) : null,
    }));

    res.json({
      reportDate: dateQuery || start.toISOString().slice(0, 10),
      count: data.length,
      data,
    });
  } catch (error) {
    console.error("reportController.getDailyReport error:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
  }
};

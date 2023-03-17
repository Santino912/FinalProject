import { Request, Response } from "express"
import Report from "../../models/Report"

const getReports = async (req: Request, res: Response) => {
    try {
        const report = Report.find()
    } catch (err) {
        return res.status(500).send(err)

    }
}
export default getReports
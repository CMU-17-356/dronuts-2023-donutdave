// @ts-nocheck
import { companyID, droneAPI, airbaseAPI } from '../index.js'
import { Request, Response } from 'express'
import got from 'got'

class MerchantsController {
  public getDrones = async (req: Request, res: Response) => {
    const response = await got.get(airbaseAPI + "/" + companyID).json()
    const drones = []
    for (const id of response.drones) {
      const d = await got.get(droneAPI + "/" + id).json();
      if (d.current_delivery && d.current_delivery.status === "in_route") {
        drones.push({
          id: d.id,
          drone_name: d.drone_name,
          status: "in_route"
        })
      } else {
        drones.push({
          id: d.id,
          drone_name: d.drone_name,
          status: "available"
        })
      }
    }

    if (req.query.status == null) {
      return res.status(200).json(drones)
    } else {
      const status = req.query.status
      if (status !== "available" && status !== "in_route" && status !== "charging") {
        return res.status(404).json("Invalid drone status")
      }
      return res.status(200).json(drones.filter((drone) => drone.status === status))
    }
  }

  static getFirstAvailableDrone = async () => {
    const response = await got.get(airbaseAPI + "/" + companyID).json()
    for (const id of response.drones) {
      const d = await got.get(droneAPI + "/" + id).json();
      if (!(d.current_delivery && d.current_delivery.status === "in_route")) {
        const res = await got.put(droneAPI + "/" + id + "/send", {
          json: {
            id: id,
            lat: 40, // TODO
            lon: -80,
          }
        })
        if (res.statusCode == 204) {
          return id
        }
      }
    }
    return null
  }
}

export { MerchantsController }
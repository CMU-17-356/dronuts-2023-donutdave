import { Schema, model } from 'mongoose'

interface IMetric {
  title: string;
  num_accounts: number;
  num_orders: number;
  gross_revenue: number;
}

const metricSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  num_accounts: {
    type: Number,
    default: 0
  },
  num_orders: {
    type: Number,
    default: 0
  },
  gross_revenue: {
    type: Number,
    default: 0.0
  },
});

const Metric = model('Metric', metricSchema)

export { Metric }
export type { IMetric }
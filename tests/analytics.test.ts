import {
recordDelivery,
getMetrics
}
from "../src/analytics/metrics";

describe(
"Analytics",
()=>{

test(
"Delivery Counter",
()=>{

recordDelivery("email");

expect(
getMetrics()
.deliveries
.get("email")
).toBe(1);

});

});
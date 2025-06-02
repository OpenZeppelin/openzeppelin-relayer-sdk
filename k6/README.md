## Load Test

### EVM

#### Prerequisites
- K6 installed.
- Access to a running relayer API service
- Netdata(to get graphical stats)

#### Variables
`API_URL` e.g localhost:8080

`ACCESS_TOKEN` e.g 9e9e9e9e-71sb-8756-53yb-zbe34e0276

`RELAYER_IDS` e.g sepolia-example

#### How to run

- Install XK6 (`go install go.k6.io/xk6/cmd/xk6@latest`)
- Run `./k6 run -o output-statsd single-network.js`
- Repeat for the multi-networks(multi-networks.js) and Solana(solana.js)


#### Example output

##### EVM










##### Solana

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

<img width="1089" alt="Screenshot 2025-06-02 at 21 30 22" src="https://github.com/user-attachments/assets/3f2b1336-36c8-48e5-835f-4a5822934d0f" />
<img width="1136" alt="Screenshot 2025-06-02 at 21 30 15" src="https://github.com/user-attachments/assets/f06588c5-48cf-4e26-bca4-3e8a90dff534" />
<img width="1297" alt="Screenshot 2025-06-02 at 21 30 08" src="https://github.com/user-attachments/assets/69fca6bb-0329-4a92-bb10-96ac9aabfbd4" />


##### Solana

<img width="821" alt="Screenshot 2025-06-02 at 23 23 57" src="https://github.com/user-attachments/assets/acf4afa3-ccb5-4069-9265-aebe8982d493" />
<img width="1117" alt="Screenshot 2025-06-02 at 23 23 28" src="https://github.com/user-attachments/assets/7120f646-7ae2-4137-81f0-c1fb8ccc670b" />
<img width="1102" alt="Screenshot 2025-06-02 at 23 23 09" src="https://github.com/user-attachments/assets/ee565ae8-f087-47fb-ba0a-937da5c54948" />

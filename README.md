Add .env with this content:
```
PRIVATE_KEY="your private key"
API_KEY="your api key"
```

1.Deploy smart contract using:

npx hardhat run scripts/deploy.js

2.Run localhost 

cd main-site

npm start 

3.Modify App.js 

change smart contract address 
```
  const [conadd] = useState("contract address");
  ```
4.Modify end.js 
  
  change smart contract address 
  ```
  const conadd = "contract address";
  ```
5.Use site 
  
6.End auction using 
  
 npx hardhat run scripts/end.js

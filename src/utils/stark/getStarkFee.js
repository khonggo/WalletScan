import axios from "axios";

async function processFees(
    totalFee,
    data,
) {
    for (let i = 0; i < data.length; i++) {

        const fee = (parseInt(data[i].actual_fee, 16) / 10 ** 18).toFixed(8)
        totalFee += parseFloat(fee);

    }
    return totalFee;
}

async function getStarkFee(address) {
    try {
        let totalFee = 0;;

        const initUrl = 'https://api.starkscan.co/api/v0/transactions?contract_address=' + address + '&limit=100';
        
        const initResponse = await axios.get(initUrl, {
          headers: {
            'accept': 'application/json',
            'x-api-key': 'docs-starkscan-co-api-123'
          }
        });
        // const initDataLength = initResponse.data.total;
        totalFee =
            await processFees(
                actual_fee,
                initResponse.data.data,
            );
        // if (initDataLength > 100) {
        //     fromBlockNumber = initResponse.data.list[0].blockNumber;
        //     fromTxIndex = initResponse.data.list[0].indexInBlock;
        //     while (true) {
        //         let url = `https://zksync2-mainnet-explorer.zksync.io/transactions?limit=100&direction=older&accountAddress=${address}`;
        //         if (fromBlockNumber !== undefined && fromTxIndex !== undefined && offset !== 0) {
        //             url += `&fromBlockNumber=${fromBlockNumber}&fromTxIndex=${fromTxIndex}&offset=${offset}`;
        //         }
        //         const response = await axios.get(url);
        //         const ListLength = response.data.list.length;
        //         [zks2_last_tx,
        //          totalExchangeAmount, totalFee, contract, days, weeks, months, l1Tol2Times, l1Tol2Amount,
        //          l2Tol1Times, l2Tol1Amount] =
        //             await processTransactions(
        //                 zks2_last_tx,
        //                 totalExchangeAmount,
        //                 address,
        //                 totalFee,
        //                 contract,
        //                 days,
        //                 weeks,
        //                 months,
        //                 response.data.list,
        //                 l1Tol2Times,
        //                 l1Tol2Amount,
        //                 l2Tol1Times,
        //                 l2Tol1Amount
        //             );
        //         if (ListLength === 100) {
        //             offset += ListLength;
        //         } else {
        //             break;
        //         }
        //     }
        // }
        // dayActivity = days.size;
        // weekActivity = weeks.size;
        // monthActivity = months.size;
        // contractActivity = contract.size;
        // console.log("zks2_last_tx", zks2_last_tx);
        return {
            totalFee: totalFee.toFixed(5),
        }
    } catch (e) {
        console.log(e);
        return {
            totalFee: "Error",
        }
    }
}

export default getStarkFee;

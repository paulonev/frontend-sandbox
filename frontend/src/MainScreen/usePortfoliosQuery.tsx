import { useQuery } from '@tanstack/react-query';
import { MainScreenQueryKey } from '../constants';
import { PortfolioApi } from '../Api/PortfolioApi';
import { PortfoliosData } from '../Api/portfolios.schema';

// use as a fallback data???
// const MOCK_PORTFOLIOS: PortfoliosData = {
//     meta: {
//         overallVolume: 16586,
//         gainLoss: {
//             inVolume: 166.32,
//             inPercentage: 0.0306,
//             type: "gain"
//         }
//     },
//     items: [
//         {
//             id: 1,
//             meta: {
//                 volume: 5672,
//                 gainLoss: {
//                     inVolume: 56.32,
//                     inPercentage: 0.0102,
//                     type: "loss"
//                 }
//             },
//             isMain: true,
//             name: "Крипта тест",
//             tags: ["Crypto"],
//             colorScheme: "main"
//         },
//         {
//             id: 2,
//             meta: {
//                 volume: 5672,
//                 gainLoss: {
//                     inVolume: 56.32,
//                     inPercentage: 0.0102,
//                     type: "gain"
//                 }
//             },
//             isMain: false,
//             name: "Металлы",
//             tags: ["Crypto"],
//             colorScheme: "pattensBlue"
//         },
//         {
//             id: 3,
//             meta: {
//                 volume: 5672,
//                 gainLoss: {
//                     inVolume: 56.32,
//                     inPercentage: 0.0102,
//                     type: "gain"
//                 }
//             },
//             isMain: false,
//             name: "Металлы",
//             tags: ["Crypto"],
//             colorScheme: "springSun"
//         },
//         {
//             id: 4,
//             meta: {
//                 volume: 5672,
//                 gainLoss: {
//                     inVolume: 56.32,
//                     inPercentage: 0.0102,
//                     type: "gain"
//                 }
//             },
//             isMain: false,
//             name: "Металлы",
//             tags: ["Crypto"],
//             colorScheme: "hintOfGreen"
//         }
//     ],
// };

//about initialData and placeholderData - https://tkdodo.eu/blog/placeholder-and-initial-data-in-react-query     
export const usePortfoliosQuery = () => {
    return useQuery<PortfoliosData>({
        queryKey: [MainScreenQueryKey],
        queryFn: () => PortfolioApi.getPortfolios(),
        throwOnError: true,
        retry: false //to bail out error asap
    })
}
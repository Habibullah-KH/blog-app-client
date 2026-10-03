//  {
//       title: "Getting Started",
//       items: [
//         {
//           title: "Write Blog",
//           url: "/dashboard/write-blog",
//         },
//         {
//           title: "Analytics",
//           url: "/dashboard/analytics",
//         },
//       ],
//     },

export interface Route {
    title: string,
    items: {
        title: string;
        url: string;
    }[];
}
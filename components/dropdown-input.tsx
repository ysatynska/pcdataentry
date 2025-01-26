// import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@heroui/react";
// import React from "react";

// interface Option {
//     key: string;
//     label: string;
// }

// export default function DropdownInput({ options }: {options: Option[]}) {
//   const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Enter the student's grade"]));

//   const selectedValue = React.useMemo(
//     () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
//     [selectedKeys],
//   );

//   return (
//     <Dropdown>
//       <DropdownTrigger>
//         <Button className="capitalize" variant="flat">
//           {selectedValue}
//         </Button>
//       </DropdownTrigger>
//       <DropdownMenu
//         disallowEmptySelection
//         aria-label="Single selection example"
//         selectedKeys={selectedKeys}
//         selectionMode="single"
//         variant="flat"
//         onSelectionChange={setSelectedKeys}
//         items={options}
//       >
//         {(option) => (
//             <DropdownItem
//                 key={option.key}
//                 className={option.key === "delete" ? "text-danger" : ""}
//                 color={option.key === "delete" ? "danger" : "default"}
//             >
//                 {option.label}
//             </DropdownItem>
//         )}
//       </DropdownMenu>
//     </Dropdown>
//   );
// }
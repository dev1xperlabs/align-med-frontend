import PeopleIcon from "@mui/icons-material/People";
import AccountBalance from "@mui/icons-material/AccountBalance";
import CurrencyExchange from "@mui/icons-material/CurrencyExchange";
import AddBoxOutlined from "@mui/icons-material/AddBoxOutlined";
import Calculate from "@mui/icons-material/Calculate";
import User from "@mui/icons-material/Person";

export const navigationData: iNavigationItem[] = [
    {
        title: "Patient Intake",
        icon: PeopleIcon,
        url: "/patient-intake",
    },
    {
        title: "Settlements",
        icon: AccountBalance,
        url: "/settlements",
    },
    {
        title: "Doctor Bonus",
        icon: CurrencyExchange,
        url: "/add-doctor-bonus-rule",
        items: [
            {
                title: "Add Doctor Bonus Rule",
                url: "/add-doctor-bonus-rule",
                icon: AddBoxOutlined,
            },
            {
                title: "Calculate Bonus",
                url: "/calculate-bonus",
                icon: Calculate,
            },
        ],
    },
    {
        title: "User Management",
        icon: User,
        url: "/user-management",
    },
];

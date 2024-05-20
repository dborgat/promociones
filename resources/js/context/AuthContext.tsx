import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect,
    useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../../authService";
interface Promocode {
    id: number;
    title: string;
    code: string;
    discount: number;
    redeemed: boolean;
}
interface User {
    name: string;
    email: string;
    count: number;
}

interface Offer {
    id: string;
    name: string;
    description: string;
    discount: number;
    title: string;
}

interface AuthContextProps {
    isUserLoggedIn: boolean;
    setIsUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    user: User;
    getUserName: () => Promise<void>;
    getCountPromotionalCodes: () => Promise<void>;
    promocodes: Promocode[];
    getPromocodes: () => Promise<void>;
    redeemCode: (promocode: string) => Promise<void>;
    offers: Offer[];
    getOffers: () => Promise<void>;
    countPromotionalCodes: number;
    generatePromocode: (
        offerId: string,
        offerdiscount: number,
        offertitle: string
    ) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<User>({ name: "", email: "", count: 0 });
    const [promocodes, setPromocodes] = useState<Promocode[]>([]);
    const [offers, setOffers] = useState<Offer[]>([]);
    const [countPromotionalCodes, setCountPromotionalCodes] =
        useState<number>(0);
    const navigate = useNavigate();

    const fetchUserName = useCallback(async () => {
        try {
            const userData = await authService.getUserName();
            setUser(userData);
        } catch (error: any) {
            navigate("/error");
        }
    }, [navigate]);

    const fetchCountPromotionalCodes = useCallback(async () => {
        try {
            const count = await authService.getCountPromotionalCodes();
            setUser((prev) => ({ ...prev, count }));
            setCountPromotionalCodes(count);
        } catch (error: any) {
            navigate("/error");
        }
    }, [navigate]);

    const fetchPromocodes = useCallback(async () => {
        try {
            const promocodeData = await authService.getPromocodes();
            setPromocodes(promocodeData);
        } catch (error: any) {
            console.error("Error fetching promotional codes", error.response);
        }
    }, []);

    const handleRedeemCode = useCallback(
        async (promocode: string) => {
            try {
                await authService.redeemCode(promocode);
                fetchPromocodes();
            } catch (error: any) {
                navigate("/error");
            }
        },
        [fetchPromocodes]
    );

    const fetchOffers = useCallback(async () => {
        try {
            const offerData = await authService.getOffers();
            setOffers(offerData);
        } catch (error: any) {
            navigate("/error");
        }
    }, [navigate]);

    const handleGeneratePromocode = useCallback(
        async (offerId: string, offerdiscount: number, offertitle: string) => {
            try {
                await authService.generatePromocode(
                    offerId,
                    offerdiscount,
                    offertitle
                );
                fetchCountPromotionalCodes(); // Actualizar el contador de códigos promocionales
            } catch (error: any) {
                navigate("/error");
            }
        },
        [fetchCountPromotionalCodes]
    );

    useEffect(() => {
        if (isUserLoggedIn) {
            fetchUserName();
            fetchCountPromotionalCodes();
            fetchPromocodes();
            fetchOffers();
        }
    }, [
        isUserLoggedIn,
        fetchUserName,
        fetchCountPromotionalCodes,
        fetchPromocodes,
        fetchOffers,
    ]);

    return (
        <AuthContext.Provider
            value={{
                isUserLoggedIn,
                setIsUserLoggedIn,
                user,
                getUserName: fetchUserName,
                getCountPromotionalCodes: fetchCountPromotionalCodes,
                promocodes,
                getPromocodes: fetchPromocodes,
                redeemCode: handleRedeemCode,
                offers,
                getOffers: fetchOffers,
                countPromotionalCodes,
                generatePromocode: handleGeneratePromocode,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

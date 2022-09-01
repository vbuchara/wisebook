import { forwardRef, useState } from 'react';
import Image from 'next/image';

import UserAvatarImg from '@public/user-avatar.jpg';

import { 
    Avatar, 
    AvatarFallback, 
    AvatarImage 
} from "../styles";

import type { User } from 'firebase/auth';
import type { AvatarImageProps } from '@radix-ui/react-avatar';

export type UserAvatarProps = {
    user: User
};

export function UserAvatar({ user }: UserAvatarProps){
    const [avatarSrc, setAvatarSrc] = useState<string | undefined>(UserAvatarImg.src);

    const AvatarNextImage = forwardRef<
        HTMLImageElement, AvatarImageProps
    >(({ className }, ref) => {
        return (
            <div className={className}>
                <Image
                    src={user.photoURL || "https://lh3.googleusercontent.com"}
                    layout="responsive"
                    height="1rem"
                    width="1rem"
                    alt={`Imagem do usuário ${user.displayName}`}
                    referrerPolicy="no-referrer" 
                    priority={true}
                    onError={() => {
                        setAvatarSrc(undefined);
                    }}
                />
            </div>
        );
    });

    return (
        <Avatar>
            <AvatarImage
                asChild
                src={avatarSrc}
            >
                <AvatarNextImage/>
            </AvatarImage>
            <AvatarFallback
                delayMs={600}
            >
                <div>
                    <Image
                        src={UserAvatarImg}
                        layout="responsive"
                        height="1rem"
                        width="1rem"
                        priority={true}
                        objectFit="cover"
                    />
                </div>
            </AvatarFallback>
        </Avatar>
    );
}
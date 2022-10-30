import { forwardRef, useState } from 'react';
import { remToPx } from 'polished';
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
                    placeholder="blur"
                    blurDataURL={UserAvatarImg.src}
                    alt={`Imagem do usuário ${user.displayName}`}
                    referrerPolicy="no-referrer" 
                    priority={true}
                    onError={() => {
                        setAvatarSrc(undefined);
                    }}
                    sizes="30vw"
                    fill
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
                        alt={`Imagem Padrão de Usuário`}
                        placeholder="blur"
                        blurDataURL={UserAvatarImg.src}
                        priority={true}
                        sizes="30vw"
                        fill
                    />
                </div>
            </AvatarFallback>
        </Avatar>
    );
}
import { NextMiddleware, NextResponse } from "next/server";

import admin from 'config/FirebaseAdminConfig';

type RouteParams = {
    id: string;
}

type RequestPageType = { 
    name: string, 
    params: RouteParams 
};

export const AuthMiddleware: NextMiddleware = async(request, event) => {

    const { name, params } = request.page as RequestPageType;

    console.log('');
    
    return NextResponse.next();
}
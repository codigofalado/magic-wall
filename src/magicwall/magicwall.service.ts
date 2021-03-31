import { Injectable } from '@nestjs/common';

@Injectable()
export class MagicwallService {
    getTest(){
        return 'Opa! Está testado';
    }
}

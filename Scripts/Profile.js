export class UserProfile{
    
    constructor(userName, email,phone,activeStreak,weight,subscriptionTier,height) {
    this.userName = userName;
    this.email = email;
    this.phone = phone;
    this.activeStreak = activeStreak;
    this.weight = weight;
    this.height = height;
    this.subscriptionTier = subscriptionTier;
    }

    //used for the analytics page and weight calculations
    getData(){
        return this.activeStreak,this.weight;
    }

}
export class UserProfile{
    
    constructor(userName, email,phone,activeStreak,weight,subscriptionTier) {
    this.userName = userName;
    this.email = email;
    this.phone = phone;
    this.activeStreak = activeStreak;
    this.weight = weight;
    this.subscriptionTier = subscriptionTier;
    }

    //used for the analytics page and weight calculations
    getData(){
        return this.activeStreak,this.weight;
    }

}
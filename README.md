# eval-frontend
Projet de Gestion des évaluations des formations

## Table des matières
### Index
- [Organisation des fichiers](#organisation)
- [Installation](#installation)


## Projet
- Angular
- Ionic


## Organisation
[Haut](#index)
```
├── admin  
├── features  
    ├── about  
        ├── about.module.ts  
        ├── about.page.html  
        ├── about.page.scss  
        ├── about.page.spec.ts  
        ├── about.page.ts  
    ├── auth  
        ├── signin  
            ├── signin.module.ts  
            ├── signin.page.html  
            ├── signin.page.scss  
            ├── signin.page.spec.ts  
            ├── signin.page.ts  
        ├── signup  
            ├── signup.module.ts  
            ├── signup.page.html  
            ├── signup.page.scss  
            ├── signup.page.spec.ts  
            ├── signup.page.ts  
        ├── user-edit-page  
            ├── user-edit-page.component.ts  
            ├── user-edit-page.component.html  
            ├── user-edit-page.component.scss  
            ├── user-edit-page.component.spec.ts  
            ├── user-edit-page.component.ts  
        ├── user-page  
            ├── user-page.component.ts  
            ├── user-page.component.html  
            ├── user-page.component.scss  
            ├── user-page.component.spec.ts  
            ├── user-page.component.ts  
    ├── formations  
        ├── formations-detail  
            ├── formation.module.ts  
            ├── formation.page.html  
            ├── formation.page.scss  
            ├── formation.page.spec.ts  
            ├── formation.page.ts   
        ├── formations-list  
            ├── formations.module.ts  
            ├── formations.page.html  
            ├── formations.page.scss  
            ├── formations.page.spec.ts  
            ├── formations.page.ts   
    ├── rating  
        ├── rating-formation  
            ├── rating-formation.module.ts  
            ├── rating-formation.page.html  
            ├── rating-formation.page.scss  
            ├── rating-formation.page.spec.ts  
            ├── rating-formation.page.ts   
├── shared        
    ├── components  
        ├── footer  
            ├── footer.module.ts  
            ├── footer.page.html  
            ├── footer.page.scss  
            ├── footer.page.spec.ts  
            ├── footer.page.ts   
            ├── footer.router.module.ts   
        ├── header  
            ├── header.component.html  
            ├── header.component.scss  
            ├── header.component.spec.ts  
            ├── header.component.ts  
        ├── star-rater  
            ├── star-rater.component.html  
            ├── star-rater.component.scss  
            ├── star-rater.component.spec.ts  
            ├── star-rater.component.ts     
    ├── pipes  
        ├── day-of-week.pipe.spec.ts  
        ├── day-of-week.pipe.ts  
    ├── shared.module.ts  
```

## Organisation
```
├── _core  
    ├── constants
        ├── constants.ts  
    ├── guard
        ├── auth.guard.spec.ts   
        ├── auth.guard.ts
        ├── check-auth.guard.ts
    ├── toast
        ├── toast-controller.ts  
├── _models
    ├── formations.ts 
    ├── user.ts 
    ├── index.ts 
├── _services
    ├── interceptors
        ├── token.interceptor.ts 
    ├── auth.service.spec.ts
    ├── auth.service.ts
    ├── formations.service.spec.ts
    ├── formations.service.ts
    ├── http.service.spec.ts
    ├── http.service.ts
    ├── search.service.spec.ts
    ├── search.service.ts
```

## Installation
[Haut](#index)
```
npm install
```

## Démarrer du projet frontend
```
ionic serve
```
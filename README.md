# ColumnCompute 

## Table of content
1. Quick Walkthrough
2. FlowChart (HLD)
3. Features
4. Tech Stack
5. Installation
6. Future Scope


---
## 1. Quick Walkthrough

CLICK TO SEE VIDEO

https://www.loom.com/share/bab731e611fb45029a323e5c1b9ddfd0

<img src="https://github.com/user-attachments/assets/5508aff7-32ad-44ac-b5fd-545e2c18fdb7" width="400"/>
<img src="https://github.com/user-attachments/assets/8d67eb38-33f7-4e03-b792-b1948db52fd9" width="400"/>
<img src="https://github.com/user-attachments/assets/2d61a75e-98c7-4ca5-9d3d-cd26c5831584" width="400"/>
<img src="https://github.com/user-attachments/assets/82509614-f5aa-42be-b12b-3cf3a578953a" width="400"/>
<img src="https://github.com/user-attachments/assets/cdddcd20-fc80-462a-bef8-d885b494a336" width="400"/>



---
## 2. FlowChart (HLD)
Here’s the high-level diagram showing the architecture of the project.
![image](https://github.com/user-attachments/assets/25e44262-e69f-4802-9954-704e52416cf6)

---

## 3. Features

1. **Third-Party Authentication**  
   Uses [Auth0](https://auth0.com/) for secure authentication with trusted Google services.

2. **Data Storage**  
   Stores data in a relational format using [Supabase](https://supabase.com/), a reliable and scalable service.

3. **Scalability**  
   Both **Auth0** and **Supabase** are designed for scalability, ensuring efficient handling of increased traffic.

4. **Column Validation (C3 & C4)**  
   - Invalid data types for mathematical operations are flagged by the backend.
   - Empty (NaN) rows are automatically ignored.
   - Missing columns (C3 or C4) trigger an error and notify the user.

5. **Docker Integration**  
   Uses a **Dockerfile** to consolidate dependencies, simplifying deployment and enabling scalable containerization for high traffic.

---
## 4. Tech Stack
1. Frontend
   
   <img src="https://github.com/user-attachments/assets/3ea4e122-1987-4569-a203-0caed7ba4f6b" width="90"/>
2. Backend
   
    <img src="https://github.com/user-attachments/assets/bad1b8ca-e958-484b-8f11-58cd27135b67" width="90"/>

3. Database

   <img src="https://github.com/user-attachments/assets/56225414-9738-4797-bc81-9588f6c2615b" width="180"/>

4. Other Framework/Platform

   <img src="https://github.com/user-attachments/assets/8e0b0200-914c-4946-9b19-0d22df7c7fef" width="90"/>
   <img src="https://github.com/user-attachments/assets/3201f4d5-63fe-4c83-9163-f3bf9f764b30" width="90"/>
   <img src="https://github.com/user-attachments/assets/29141537-609f-419e-8bdf-68249c229198" width="180"/>

---

## 5. Installation
1. Clone
```
git clone https://github.com/Priyam7295/ColumnCompute.git
```
2. Go the ColumnCompute directory
```
cd ColumnCompute
````
3. create .env
```
```
4. copy this in .env created
```
NEXT_PUBLIC_SUPABASE_KEY=supabasrKey
NEXT_PUBLIC_SUPABASE_URL=SupabaseURL
NEXT_PUBLIC_GOOGLE_API_KEY= yourGoogleGenAikey
```
5. create requirements.txt
```
```
6. Copy this to the txt file
```
Flask
Flask-CORS
pandas
numpy
supabase
python-dotenv
google-generativeai

```
7. Run this to start server
```
pip install -r requirements.txt
python back.py
```

8. Go the client directory for running frontend
```
cd client
```
9. Create .env
```
```
10. Copy this to the created .env
```
VITE_REACT_APP_BACKEND_URL=http://localhost:5000
VITE_REACT_APP_uri=http://localhost:5173/upload
VITE_REACT_APP_DOMAIN=auth0-domain
VITE_REACT_APP_CLIENID=auth0-clientId
```
11. Run the frontend
```
npm i
npm run dev
```

---
## 6. Future Scope
Enchanced  Data Visualisation
 Add various visualizations, such as histograms, pie charts, and other interactive charts, to improve data analysis and provide better insights for users.





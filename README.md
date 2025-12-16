# Crypto Checkout Widget

A responsive crypto payment checkout widget built with Next.js and TypeScript, designed to be embedded on any website for seamless crypto-to-fiat conversions.

## 🚀 Demo

[Live Demo](Frontend Developer Take-Home Assessment (React / Next.js) Objective This assessment is designed to evaluate your ability to convert designs into clean, responsive, production-ready frontend code using React/Next.js.  The focus is on UI accuracy, component structure, state handling, and code quality — not backend complexity.  Product Context You are building a simple crypto checkout experience that can be embedded on any website (similar to Stripe Checkout but crypto-payment checkout).  The checkout allows a user to:  Review payment details Enter required information Complete a payment flow Design Use the Figma design below as a reference:  🔗 Figma Design: https://www.figma.com/design/FRfbMHys4JINX4V9qBxgbf/Frontend-Assessment?node-id=0-1  Task Select any 2 pages/screens from the Figma design and convert them into code.  You are free to choose which two pages you think best demonstrate your skills.  Technical Requirements Use React.js or Next.js TypeScript is preferred Responsive design (desktop + mobile) Clean component structure Basic form state handling Reasonable accessibility practices Functional Expectations Components should reflect the design closely Forms should capture input and manage state Buttons and interactions should behave logically No backend integration required (mock data is fine) Nice-to-Have (Optional) These are optional and considered a bonus:  Reusable components Basic form validation Simple loading or error states Thoughtful folder structure What to Submit GitHub repository link Vercel/Netlify Demo Link (A video demo via Loom or Jam.dev is also fine) README including: Setup instructions Any assumptions or trade-offs made) | 

## 📋 Features

- **Multi-tab Interface**: Crypto to cash, Cash to crypto, and Crypto to fiat loan options
- **Real-time Conversion**: Live exchange rate calculations with debounced input
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Form Validation**: Comprehensive validation with user-friendly error messages
- **Loading States**: Visual feedback during conversion processes
- **Dropdown Animations**: Smooth open/close animations for all dropdowns
- **Toast Notifications**: Success and error notifications using react-toastify
- **Accessibility**: Proper ARIA labels and keyboard navigation support

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/novacrust-widget.git
   cd crypto-checkout-widget
   ```
2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```
3. **Add font files** (if using local Clash Display font)

   ```
   public/fonts/ClashDisplay-Variable.woff2
   ```
4. **Run development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. **Open in browser**

   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
npm start
```

## 🏗️ Project Structure

```
app/
├── components/
│   ├── AmountInput.tsx          # Currency input with integrated dropdown
│   ├── CryptoConverterWidget.tsx # Main widget component
│   ├── CryptoDropdown.tsx       # Crypto selection dropdown
│   ├── CurrencySelector.tsx     # Currency display button
│   ├── Dropdown.tsx             # Generic dropdown component
│   ├── WalletDropdown.tsx       # Wallet selection dropdown
│   ├── tab.tsx                  # Tab selector component
│   └── interfaces.ts            # TypeScript interfaces
├── fonts.ts                     # Font configurations
├── globals.css                  # Global styles
├── layout.tsx                   # Root layout with toast container
└── page.tsx                     # Main page component
```

## 🎨 Design Implementation

This project implements 2 key screens from the Figma design:

1. **Main Conversion Interface**: Multi-step form with currency selection, amount input, and wallet selection
2. **Interactive States**: Loading, error, and success states with proper user feedback

## 🔧 Technical Decisions & Trade-offs

### Assumptions Made

- **Mock Exchange Rates**: Used hardcoded conversion rates (ETH-NGN: 6.5M, USDT-NGN: 1650) instead of real API integration
- **Simulated API Calls**: 2-second delay with 80% success rate for demonstration purposes
- **Font Fallback**: Used Space Grotesk as fallback for Clash Display font
- **Icon Assets**: Assumed icon files exist in `/icons/` directory

### Trade-offs

1. **Component Integration vs Separation**

   - **Chosen**: Integrated dropdown logic into AmountInput component
   - **Trade-off**: Less reusable but better positioning control and simpler state management
2. **Animation Performance vs Complexity**

   - **Chosen**: CSS transitions over complex animation libraries
   - **Trade-off**: Simpler implementation but fewer animation options
3. **Form Validation Strategy**

   - **Chosen**: Client-side validation with toast notifications
   - **Trade-off**: Immediate feedback but no server-side validation
4. **State Management**

   - **Chosen**: Local component state with useEffect for conversions
   - **Trade-off**: Simpler setup but less scalable for complex applications

### Technical Highlights

- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints
- **TypeScript**: Full type safety with custom interfaces
- **Performance**: Debounced conversion calculations (300ms delay)
- **Accessibility**: Proper focus management and keyboard navigation
- **Error Handling**: Comprehensive error states with auto-dismiss timers

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Manual Deployment

```bash
npm run build
npm run export  # if using static export
```

## 🔮 Future Enhancements

- Real exchange rate API integration
- Backend payment processing
- Multi-language support
- Advanced form validation
- Transaction history
- Webhook integration

## 📝 License

MIT License - feel free to use this project as a reference or starting point.

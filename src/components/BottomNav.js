

import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const TAB_COLORS = {
  Radar: '#4C96F0',
  Match: '#F4C2C2',
  Post: '#F4C2C2',
  Confessions: '#1B1919',
  Profile: '#F4C2C2',
};

export default function BottomNav() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
const state = useNavigationState(state => state);
const currentRoute = state.routes[state.index].name;

const getIconColor = (routeName) =>
  currentRoute === routeName ? '#fff' : '#111';



const IconWrapper = ({ routeName, children }) => {
  const isActive = currentRoute === routeName;
  const color = TAB_COLORS[routeName];

  return (
    <View style={{ alignItems: 'center' }}>
      
      {/* 🔥 CONNECTOR TO SCREEN */}
      {isActive && (
        <View
          style={{
            position: 'absolute',
            top: -15,             // pushes into screen
            width: 49,
            height: 26,
            backgroundColor: color,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            zIndex: -1,
          }}
        />
      )}

      {/* ICON LIFT */}
      <View style={[isActive && { marginTop: -18 }]}>
        <View
          style={[
            styles.iconWrapper,
            isActive && {
              backgroundColor: color,
              width: 56,
              height: 56,
              borderRadius: 28,
              marginTop: 6,
            },
          ]}
        >
          {children}
        </View>
      </View>
    </View>
  );
};



  return (
    <View
      style={[
        styles.container,
        { paddingBottom: Math.max(insets.bottom, 10) },
      ]}
    >
      {/* Home Icon */}
      <TouchableOpacity onPress={() => navigation.navigate('Match')}>
        <IconWrapper routeName="Match">

        <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 48 48" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m18.044 13.446l2.437 11.338a2.335 2.335 0 0 0 2.774 1.792l2.956-.635l3.296 2.13l2.13-3.297l2.956-.635a2.335 2.335 0 0 0 1.792-2.774l-2.438-11.338a2.335 2.335 0 0 0-2.773-1.792l-11.338 2.438a2.335 2.335 0 0 0-1.792 2.773" strokeWidth={1}></path><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M31.595 15.408a2.534 2.534 0 0 0-3.01-1.945a2.53 2.53 0 0 0-1.862 1.657a2.53 2.53 0 0 0-2.379-.745a2.534 2.534 0 0 0-1.588 3.86c1.326 2.18 5.494 3.99 5.494 3.99s3.057-3.363 3.37-5.895a2.5 2.5 0 0 0-.025-.922M7.27 37.51l5.22-2.046c.958-.381 1.29-1.23 1.396-1.701c.214-.943-.04-1.972-.652-2.628a2.14 2.14 0 0 1 .116-3.024a2.13 2.13 0 0 1 3.023.116c1.226 1.324 1.88 3.142 1.847 4.976l8.084-3.17a2.144 2.144 0 0 1 2.776 1.208a2.15 2.15 0 0 1-1.208 2.776l-1.716.675" strokeWidth={1}></path><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M22.647 39.999a2.14 2.14 0 0 1-1.2-4.096l3.226-1.214a2.14 2.14 0 0 1 1.507 4.006l-3.226 1.214a2 2 0 0 1-.307.09m1.251 4.093a2.14 2.14 0 0 1-.935-4.16l1.937-.612a2.13 2.13 0 0 1 2.684 1.397a2.14 2.14 0 0 1-1.397 2.684l-1.937.611a2 2 0 0 1-.352.08" strokeWidth={1}></path><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M20.407 45.203c.937-.339 2.442-1.231 2.442-1.231" strokeWidth={1}></path><circle cx={24} cy={24} r={21.5} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}></circle></svg>
        </IconWrapper>
      </TouchableOpacity>

  {/* Post Icon */}
      <TouchableOpacity onPress={() => navigation.navigate('Post')}>
         <IconWrapper routeName= 'Post'>
      <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 14 14"><path fill="currentColor" fillRule="evenodd" d="M6.72 1.007a.75.75 0 0 1-.66.83a5.8 5.8 0 0 0-1.76.467A.75.75 0 0 1 3.674.94A7.2 7.2 0 0 1 5.89.347a.75.75 0 0 1 .83.66m.904.014a.75.75 0 0 1 .858-.624c1.633.258 2.965.969 3.882 2.133c.91 1.156 1.35 2.683 1.35 4.47c0 2.046-.578 3.751-1.77 4.944c-1.193 1.192-2.898 1.77-4.944 1.77c-2.43 0-4.372-.818-5.54-2.482a.75.75 0 1 1 1.226-.862c.811 1.154 2.22 1.844 4.314 1.844c1.77 0 3.047-.496 3.883-1.331S12.213 8.77 12.213 7c0-1.548-.379-2.718-1.028-3.542c-.643-.817-1.61-1.37-2.937-1.58a.75.75 0 0 1-.624-.857M1.036 6.25a.75.75 0 0 1 .75.75q.002.975.194 1.755a.75.75 0 1 1-1.458.354A9 9 0 0 1 .286 7a.75.75 0 0 1 .75-.75m1.765-2.775a.75.75 0 0 0-1.184-.921a6 6 0 0 0-1.05 2.164a.75.75 0 0 0 1.448.39c.173-.646.44-1.188.786-1.633m4.2.128a.75.75 0 0 1 .75.75v1.86h1.86a.75.75 0 1 1 0 1.5H7.75v1.86a.75.75 0 1 1-1.5 0v-1.86H4.39a.75.75 0 1 1 0-1.5h1.86v-1.86a.75.75 0 0 1 .75-.75Z" clipRule="evenodd"></path></svg>
      </IconWrapper>
      </TouchableOpacity>
     
   
      {/* Radar Icon */}
      <TouchableOpacity onPress={() => navigation.navigate('Radar')}>
         <IconWrapper routeName= 'Radar'>
       <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M19.07 4.93A10 10 0 0 0 6.99 3.34M4 6h.01M2.29 9.62a10 10 0 1 0 19.02-1.27"></path><path d="M16.24 7.76a6 6 0 1 0-8.01 8.91M12 18h.01m5.98-6.34a6 6 0 0 1-2.22 5.01"></path><circle cx={12} cy={12} r={2}></circle><path d="m13.41 10.59l5.66-5.66"></path></g></svg>
   
       </IconWrapper>
        </TouchableOpacity>


           {/* Confessions Icon */}
     <TouchableOpacity onPress={() => navigation.navigate('Confessions')}>
  <IconWrapper routeName="Confessions">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={40}
      height={40}
      viewBox="0 0 12 12"
      style={{
        color: currentRoute === 'Confessions' ? '#fff' : '#111', // ✅ FIX
      }}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M6 12A6 6 0 1 1 6 0a6 6 0 0 1 0 12M3.324 4.643q0-.47.32-.953q.321-.483.935-.8t1.433-.317q.762 0 1.344.265q.584.265.9.72q.318.457.318.991q0 .422-.18.738q-.182.317-.431.548q-.25.23-.895.775a4 4 0 0 0-.287.27a1 1 0 0 0-.16.213c-.289.667-1.543.592-1.302-.342a1.8 1.8 0 0 1 .363-.535q.225-.23.609-.547q.335-.278.485-.419t.252-.314a.73.73 0 0 0 .103-.377a.85.85 0 0 0-.313-.669q-.312-.272-.806-.272q-.577 0-.85.275q-.273.274-.462.81q-.18.56-.677.56a.7.7 0 0 1-.496-.196q-.203-.195-.203-.424M6 9.75a.75.75 0 1 1 0-1.5a.75.75 0 0 1 0 1.5"
      />
    </svg>
  </IconWrapper>
</TouchableOpacity>



     <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
       <IconWrapper routeName= 'Profile'>
     <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 24 24" style={{ color: currentRoute === 'Profile' ? '#fff' : '#111' }}><path fill="currentColor" fillRule="evenodd" d="M8 7a4 4 0 1 1 8 0a4 4 0 0 1-8 0m0 6a5 5 0 0 0-5 5a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3a5 5 0 0 0-5-5z" clipRule="evenodd"></path></svg>
     </IconWrapper>
        </TouchableOpacity>

   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderColor: '#e5e5e5',
    backgroundColor: '#fff',
  },

  iconLift: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconWrapper: {
    marginTop: 8,   // try 4–8 depending on taste

    alignItems: 'center',
    justifyContent: 'center',
  },
});

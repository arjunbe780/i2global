import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
} from 'react-native';
import {wp} from '../../config/dimension';
import colors from '../../config/colors';
import fonts from '../../config/fonts';
import {NewsListCard} from './component/NewsListCard';
import {useDispatch, useSelector} from 'react-redux';
import {getNewsForYou, setIsLoading} from '../../redux/slice/NewsSlice';

function NewsForYou() {
  const {newsForYouList, isLoading} = useSelector((state: any) => state.news);
  const {currentWeatherData} = useSelector((state: any) => state.weather);
  const dispatch = useDispatch() as any;
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    dispatch(setIsLoading({isLoading: 'newsForYou'}));
    setRefreshing(false);
    if (currentWeatherData.main?.temp < 15) {
      dispatch(getNewsForYou('depressing'));
    } else if (
      currentWeatherData.main?.temp > 15 &&
      currentWeatherData.main?.temp > 30
    ) {
      dispatch(getNewsForYou('articles'));
    } else {
      dispatch(getNewsForYou('winning'));
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="rgba(255,255,255,255)"
      />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>News For You</Text>
      </View>
      <FlatList
        data={newsForYouList}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() =>
          isLoading == 'newsForYou' ? (
            <View style={styles.noDataContainer}>
              <ActivityIndicator size={'large'} color={colors.primaryButton} />
            </View>
          ) : (
            <View style={styles.noDataContainer}>
              <Text style={styles.headerTitle}>No news found</Text>
            </View>
          )
        }
        renderItem={({item}) => <NewsListCard data={item} />}
        contentContainerStyle={
          newsForYouList.length > 0 ? styles.listContent : styles.noListContent
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => getData()}
            colors={[colors.primaryButton]}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(20),
    paddingVertical: wp(16),
  },
  headerTitle: {
    fontSize: wp(24),
    color: colors.primaryText,
    fontFamily: fonts.GloryBold,
  },
  noListContent: {
    paddingHorizontal: wp(20),
    gap: wp(20),
    flex: 1,
  },
  listContent: {
    paddingHorizontal: wp(20),
    gap: wp(20),
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: wp(10),
  },
  menuContainer: {
    marginTop: wp(50),
    backgroundColor: colors.primaryBackground,
  },
  menuItem: {
    color: colors.primaryText,
    fontSize: wp(16),
    fontFamily: fonts.GloryRegular,
  },
});

export default NewsForYou;

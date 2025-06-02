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
import {IconButton, Menu} from 'react-native-paper';
import {wp} from '../../config/dimension';
import colors from '../../config/colors';
import fonts from '../../config/fonts';
import {NewsListCard} from './component/NewsListCard';
import {useDispatch, useSelector} from 'react-redux';
import {
  getTodayNews,
  setIsLoading,
  setNewsList,
} from '../../redux/slice/NewsSlice';

function News() {
  const {newsList, isLoading} = useSelector((state: any) => state.news);
  const dispatch = useDispatch() as any;
  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState([
    {label: 'General', value: 'general', isSelected: false},
    {label: 'Business', value: 'business', isSelected: false},
    {label: 'Entertainment', value: 'entertainment', isSelected: false},
    {label: 'Health', value: 'health', isSelected: false},
    {label: 'Science', value: 'science', isSelected: false},
    {label: 'Sports', value: 'sports', isSelected: false},
    {label: 'Technology', value: 'technology', isSelected: false},
  ]);
  const [isFiltered, setIsFiltered] = useState(false);
   const [refreshing, setRefreshing] = useState(false);
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    dispatch(setIsLoading({isLoading: 'news'}));
    setRefreshing(false);
    dispatch(getTodayNews());
  };

  const getFilteredNews = (value: any) => {
    dispatch(setNewsList([]));
    const updateList = category.map(item => ({
      ...item,
      isSelected: item.value === value,
    }));
    const filteredNews: any = category.filter((item: any) => item.isSelected);
    setIsFiltered(true);
    setCategory(updateList);
    dispatch(setIsLoading({isLoading: 'news'}));
    dispatch(getTodayNews(filteredNews.value));
    closeMenu();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="rgba(255,255,255,255)" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Todays Headlines</Text>
        <View>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            contentStyle={styles.menuContainer}
            anchor={
              <IconButton
                icon="filter-outline"
                size={wp(28)}
                iconColor={
                  isFiltered ? colors.primaryButton : colors.primaryText
                }
                onPress={openMenu}
                style={{margin: 0, width: wp(28), height: wp(28)}}
              />
            }>
            {category.map((item: any, index: any) => (
              <Menu.Item
                key={index}
                titleStyle={[
                  styles.menuItem,
                  {
                    color: item.isSelected
                      ? colors.primaryButton
                      : colors.primaryText,
                    fontFamily: item.isSelected
                      ? fonts.GloryBold
                      : fonts.GloryRegular,
                  },
                ]}
                onPress={() => {
                  getFilteredNews(item.value);
                }}
                title={item.label}
              />
            ))}
          </Menu>
        </View>
      </View>
      <FlatList
        data={newsList}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() =>
          isLoading == 'news' ? (
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
          newsList.length > 0 ? styles.listContent : styles.noListContent
        }
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => getData()}
            colors={[colors.primaryButton]}
          />
        }
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

export default News;

select *
from 
(   select block_time
            , nft_contract_address
            , token_id
            , collection_name
            , artist_name
            , concat(collection_name,' by ', artist_name) as art_blocks_project_name_concat
            , '<a href="https://opensea.io/assets/ethereum/' || nft_contract_address || '/' || a.`token_id`::string ||'" target="_blank" >' || concat(cast(right(cast(a.`token_id` as varchar(32)),5) as numeric)) || '</a>' as token_id_link
            , art_blocks_project_type
            , art_blocks_curated_season
            , amount_original
            , currency_symbol
            , case when currency_symbol like '%USDC%' then amount_original*1.0/p.price 
                    when currency_symbol like '%ETH%' then amount_original
                else null end as eth_price
            , case when currency_symbol like '%ETH%' then amount_original*1.0*p.price
                    when currency_symbol like '%USDC%' then amount_original
                else null end as usdc_price
            , seller 
            , '<a href="https://opensea.io/' || `seller`::string ||'" target="_blank" >' || coalesce(s.name,concat(substring(`seller`,1,5),'...',substring(`seller`,39,4))) || '</a>' as seller_link
            , buyer 
            , '<a href="https://opensea.io/' || `buyer`::string ||'" target="_blank" >' || coalesce(b.name,concat(substring(`buyer`,1,5),'...',substring(`buyer`,39,4))) || '</a>' as buyer_link
            , project
    from nft.trades a 
    inner join nft_ethereum_metadata.art_blocks_collections b on a.nft_contract_address = b.contract_address and round(a.token_id/1000000) = b.project_id
    left outer join prices.usd p on p.blockchain = 'ethereum' and p.symbol = 'WETH'  and p.minute = date_trunc('hour',a.block_time)
    left outer join ens.reverse_latest b on a.buyer = b.address
    left outer join ens.reverse_latest s on a.seller = s.address
    
    where (currency_symbol like '%ETH%' or currency_symbol like '%USDC%')
        and amount_original > 0
        and block_time >=  current_date - interval '{{Last # Days}} days' 
        
        and (
        '{{Type}}' = 'All'
        or ('{{Type}}' = 'Curated' and art_blocks_project_type = 'Curated')
        or ('{{Type}}' = 'Playground' and art_blocks_project_type = 'Playground')
        or ('{{Type}}' = 'Factory' and art_blocks_project_type = 'Factory')
        or ('{{Type}}' = 'Presents' and art_blocks_project_type in ('Playground','Factory','Presents'))
        or ('{{Type}}' = 'Art Blocks x Pace' and art_blocks_project_type = 'Art Blocks x Pace')
        or ('{{Type}}' = 'Explorations' and art_blocks_project_type = 'Explorations')
        )
) a 
where eth_price >= {{Min ETH Price}}
order by block_time desc 